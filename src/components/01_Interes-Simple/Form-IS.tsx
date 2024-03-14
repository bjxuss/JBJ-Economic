//hooks react
import { ChangeEvent, useState } from "react";
import InputControl from "../Global/InputControl";
import { FormatDMA, FormatDate } from "./FechasParser";
import { Capital, Interes_Simple, interes, tasa_interes,  tiempo, valor_Futuro, valor_presente } from "./Formulas";
import "../03_Anualidad/style.css";

interface Interes {
    capital: number,
    interes: number,
    tiempo: number,
}

interface FechaEspecifica {
    anio: number,
    mes?: number,
    dia?: number
}

enum TipoCalculo {
    ValorPresente,
    ValorFuturo,
    TasaInteres,
    Tiempo,
    Interes,
}


const Form = () => {

    //estado de la interface
    const [state, setState] = useState<Interes>({
        capital: 0,
        interes: 0,
        tiempo: 0,
    })

    const [fechaEspecifica, setFechaEspecifica] = useState<FechaEspecifica>({
        anio: 0,
        mes: 0,
        dia: 0
    })



    //Estado del resultado
    const [result, setResult] = useState<number>(0)

    const [selectOption, setselectOption] = useState<string>("")

    const [intervalo, setIntervalo] = useState({
        fechaInicio: Date.now().toString(),
        fechaFin: "",
    })

    const [monto, setmonto] = useState<number>(0)

    const [interesD, setInteresD] = useState<number>(0)

    const [tipoCalculo, setTipoCalculo] = useState<TipoCalculo>();



    // Metodo para obtener el valor del input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + value);

        if (!isNaN(parseFloat(value))) {
            name === "monto" ? setmonto(parseFloat(value)) : setState(prevState => ({
                ...prevState,
                [name]: parseFloat(value),
            }));

        }
    }

    // Obtener el valor del input tipo number
    const handleInputChange2 = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

        const { value } = event.target;

        if (!isNaN(parseFloat(value))) {
            setInteresD(
                parseFloat(value)
            );
        }

    }

    // Obtener el valor del select
    const handleInputChange3 = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

        const { name, value } = event.target;

        if (!isNaN(parseFloat(value))) {
            setFechaEspecifica(prevState => ({
                ...prevState,
                [name]: parseFloat(value)

            }));
        }



    }


    const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

        const { name, value } = event.target;

        if (!isNaN(parseFloat(value))) {
            setIntervalo(prevState => ({
                ...prevState,
                [name]: (value),
            }));
        }


    }

    const selectElement = (event: ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setselectOption(selected)
    }


    // Funcion para resetear los componentes
    const resetComponents = () => {
        setmonto(0)
        setState({
            capital: 0,
            interes: 0,
            tiempo: 0
        })

        setselectOption("option")


        setFechaEspecifica({
            anio: 0,
            mes: 0,
            dia: 0
        })
        setIntervalo({
            fechaInicio: "",
            fechaFin: ""
        })
        setInteresD(0)

        setResult(0)

    }

    // Funcion para enviar los datos
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        const tiempoValue = selectOption === 'intervalos' ? FormatDate(intervalo.fechaInicio, intervalo.fechaFin) : FormatDMA(fechaEspecifica.anio ? fechaEspecifica.anio : 0,
            fechaEspecifica.mes ? fechaEspecifica.mes : 0,
            fechaEspecifica.dia ? fechaEspecifica.dia : 0)


        setState(prevState => ({
            ...prevState,
            tiempo: tiempoValue
        }));

        if (tipoCalculo === TipoCalculo.ValorPresente) {

            if (state.interes && interesD && state.tiempo) {



                const response = Capital(interesD, state.interes, state.tiempo)

                setState(prevState => ({
                    ...prevState,
                    capital: response,
                }));

            } else if (monto && state.interes && state.tiempo) {

                console.log(monto + state.interes + state.tiempo);
                

                // const interes_ = interes(monto, state.capital)

                const valorPresente = valor_presente(state.interes, monto, state.tiempo)
                setState(prevState => ({
                    ...prevState,
                    capital: valorPresente
                }));
                setResult(valorPresente)

            }
        }

        if (tipoCalculo === TipoCalculo.Tiempo) {



            if (monto && state.capital && state.interes) {

                const Interes = interes(monto, state.capital)

                setInteresD(Interes)

                

                const response = tiempo(Interes, state.capital, state.interes)

                setFechaEspecifica(prevState => ({
                    ...prevState,
                    anio: response.años,
                    mes: response.meses,
                    dia: response.días
                }));

                setselectOption("anio")
                console.log(tiempo);

            } else if (interesD && state.capital && state.interes) {

                const capitalFinal = interesD + state.capital

                setmonto(capitalFinal)
                const response = tiempo(interesD, state.capital, state.interes)

                setFechaEspecifica(prevState => ({
                    ...prevState,
                    anio: response.años,
                    mes: response.meses,
                    dia: response.días
                }));

                setselectOption("anio")
            }
        }


        if (tipoCalculo === TipoCalculo.Interes) {



            // Interes simple
            if ((state.capital && state.interes && state.tiempo)) {
                console.log(state.capital);


                console.log(state.tiempo);

                console.log("Enter");

                const response = Interes_Simple(state.capital, state.interes, state.tiempo)
                console.log(response);

                setInteresD(response)
                setResult(response)

                //Valor futuro o monto
            }else if(state.capital && monto) {
                const interes_ = interes(monto, state.capital)

                setInteresD(interes_); 
            }
        }

        if (tipoCalculo === TipoCalculo.TasaInteres) {



            if (interesD && state.capital && state.tiempo) {

                const response = tasa_interes(interesD, state.capital, state.tiempo)

                setState(prevState => ({
                    ...prevState,
                    interes: response
                }))
            } else if (monto && state.capital && state.tiempo) {

                console.log("Tasa de Interes");

                const diff = interes(monto, state.capital)

                console.log(monto + "  " + state.capital + "  " + state.tiempo);
                

                const tasaInteres = tasa_interes(diff, state.capital, state.tiempo)

                setState(prevState => ({
                    ...prevState,
                    interes: tasaInteres
                }));

                setResult(tasaInteres)
                console.log(tasaInteres);

            }
        }

        if (tipoCalculo === TipoCalculo.ValorFuturo) {



            if (state.capital && state.interes && state.tiempo) {

                console.log("Deberia");

                const valor_futuro = valor_Futuro(state.interes, state.capital, state.tiempo)
                console.log(valor_futuro);



                setmonto(valor_futuro)
                setResult(valor_futuro)

            }



        }

        console.log("No enterr");


    }
    return (


        <form onSubmit={onSubmit} className="flex flex-col gap-2 border-[#967460]  [&>input]:rounded-md [&>input]:p-2
            [&>div]:flex [&>div]:justify-between [&>div]:item-center [&>div]:gap-4 
            [&>div>input]:rounded-md [&>div>input]:p-2 ">

            {/* <button onClick={handleToggleValidacion} className="bg-emerald-200 block px-3 py-2 rounded-lg">
                {validacionActivada ?  "Calcular Interes" : "Calcular Monto"}
            </button> */}

            <div className="button-group">
                <button className={tipoCalculo === TipoCalculo.ValorPresente ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.ValorPresente)}>Calcular Valor Presente </button>
                <button className={tipoCalculo === TipoCalculo.ValorFuturo ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.ValorFuturo)}>Calcular Valor Futuro </button>
                <button className={tipoCalculo === TipoCalculo.Tiempo ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.Tiempo)}>Calcular Tiempo</button>
                <button className={tipoCalculo === TipoCalculo.TasaInteres ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.TasaInteres)}>Calcular Tasa de Interes</button>
                <button className={tipoCalculo === TipoCalculo.Interes ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.Interes)}>Calcular Interes</button>
            </div>



            <InputControl labelName="Monto final"
                inputName="monto"
                type="number"
                className="rounded-md p-2"
                handleInputChange={handleInputChange}
                value={monto}


            />

            <InputControl labelName="Capital"
                inputName="capital"
                type="number"
                className=""
                handleInputChange={handleInputChange}
                value={state.capital}
            />


            {/* <div className="flex gap-2 [&>input]:rounded-md [&>input]:p-2"> */}
                <InputControl labelName="Tasa de Interés (%)"
                    inputName="interes"
                    type="number"
                    className="rounded-md p-2"
                    handleInputChange={handleInputChange}
                    value={state.interes}
                />
                {/* <select
                    id="tasa_interes"
                    name="tasa_interes"
                    value={selectedInteresOption}
                    onChange={selectElement}
                    className="w-22 h-10 rounded-md p-1"
                >
                    <option value="1">Diario</option>
                    <option value="2">Mensual</option>
                    <option value="3">Trimestral</option>
                    <option value="4">Cuatrimestral</option>
                    <option value="5">Semestral</option>
                    <option value="6">Anual</option>
                </select> */}
            {/* </div> */}



            <InputControl labelName="Interés"
                inputName="interesD"
                type="number"
                className="rounded-md p-2"
                handleInputChange={handleInputChange2}
                value={interesD}

            />




            <select name="selectTypeDate" id="" onChange={selectElement} className="w-22 h-10 rounded-md p-1">
                <option defaultValue="option" >Seleccione una opción</option>
                <option value="anio">Año</option>
                <option value="intervalos">Intervalos</option>
            </select>

            {selectOption === 'anio' && (
                <>
                    <InputControl labelName="Año"
                        type="number"
                        inputName="anio"
                        className="w-24 h-10 rounded-md p-1"
                        handleInputChange={handleInputChange3}

                        value={fechaEspecifica.anio} />

                    <InputControl labelName="Mes"
                        type="number"
                        inputName="mes"
                        className="w-24 h-10 rounded-md p-1"
                        handleInputChange={handleInputChange3}
                        value={fechaEspecifica.mes} />

                    <InputControl labelName="Día"
                        type="number"
                        inputName="dia"
                        handleInputChange={handleInputChange3}
                        className="w-24 h-10 rounded-md p-1"
                        value={fechaEspecifica.dia} />

                </>
            )}

            {selectOption === 'intervalos' && (
                <div>
                    <InputControl labelName="Fecha de Inicio"
                        inputName="fechaInicio"
                        type="date"
                        handleInputChange={handleSelectChange}
                        className="w-32 h-10 rounded-md p-1 ml-4"
                        value={intervalo.fechaInicio.toString()}
                    />
                    <InputControl labelName="Fecha final"
                        style="mr-4"
                        inputName="fechaFin"
                        type="date"
                        className="w-32 h-10 rounded-md p-1"
                        handleInputChange={handleSelectChange}
                        value={intervalo.fechaFin.toString()} />
                </div>
            )}

            <button
                type="submit"
                className="bg-orange-500 p-5 rounded-md cursor-pointer text-slate-100 font-semibold text-2xl
                hover:scale-105 duration-150"
            >
                Calcular
            </button>

            <button onClick={resetComponents} className="bg-red-600 p-5 rounded-md cursor-pointer text-slate-100 font-semibold text-2xl
                hover:scale-105 duration-150">Limpiar</button>
            <div className="flex justify-end">
                <h1 className="text-red-800">Result: <span>{result}</span></h1>
            </div>

        </form>

    )
}


export default Form