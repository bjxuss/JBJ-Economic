//hooks react
import { ChangeEvent,  useState } from "react";
import { Interes_Simple } from "./Valor_Futuro";
import InputControl from "../Global/InputControl";


interface Interes {
    capital: number,
    interes: number,
    tiempo: number,
}

interface FechaEspecifica {
    anio: number,
    mes: number,
    dia: number
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

    const [monto, setmonto] = useState<number>()

    const [interesD, setInteresD] = useState<number>(0)
 


    // Metodo para obtener el valor del input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

        const { name, value } = event.target;

        setState(prevState => ({
            ...prevState,
            [name]: parseFloat(value),
        }));

    }

    const handleInputChange2 = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

        const { value } = event.target;

        setInteresD(
            parseFloat(value)
      );
    }

    const handleInputChange3 = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

        const { name, value } = event.target;

        setFechaEspecifica(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    

    const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

        const { name, value } = event.target;

        setIntervalo(prevState => ({
            ...prevState,
            [name]: (value),
        }));
    }

    const selectElement = (event: ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setselectOption(selected)    
    }

    const FormatDate = (FechaI: string, FechaF: string) => {

        const FechaIncio:number = new Date(FechaI).getTime()
        const fechaFinal:number = new Date(FechaF).getTime() 

        const diferencia = fechaFinal - FechaIncio;

        const convertirDias = diferencia / (1000 * 60 * 60 * 24) // Milisegundos -> segundos -> minutos -> horas -> Días

        const convertirAños = convertirDias / 365
    

        return convertirAños
    }

    const FormatDMA = (anio: number,mes: number, dia: number) =>{
        const años = anio + (mes/12) + (dia/360)

        return años
    }

    // Funcion para enviar los datos
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        
        if (selectOption === 'intervalos') {
            setState(prevState => ({
                ...prevState,
                tiempo: FormatDate(intervalo.fechaInicio, intervalo.fechaFin),
            }));
        }else {
            setState(prevState => ({
                ...prevState,
                tiempo: FormatDMA(fechaEspecifica.anio, fechaEspecifica.mes, fechaEspecifica.dia)
            }));
        }
        
        // Interes simple
        if ((state.interes === 0) || (state.interes === undefined)) {
            console.log(monto + " monto ");
            
            console.log(state.capital, state.interes, state.tiempo);
            
            const response = Interes_Simple(state.capital, state.interes, state.tiempo)
            console.log("Response " + response);
            
            setInteresD(response)

            //Valor futuro o monto
        }else if((monto === 0) || (monto === undefined)) {
        
            const interesP = interesD / 100
            // ! POner en una funcion            
            const valorFuturo = state.capital * (1 + (interesP * state.tiempo))
            const redondeado = Math.round(valorFuturo * 100) / 100; // Redondea a dos cifras decimales

            setmonto(redondeado)
            setResult(redondeado)
            
        }else if((state.capital === 0) || (state.capital === undefined)){

            const interesP = state.interes / 100

            const valorPresente = (state.capital) / (1 + (interesP * state.tiempo))
            setState(prevState => ({
                ...prevState,
                capital: valorPresente
            }));

        // eslint-disable-next-line no-dupe-else-if
        } else if ((state.capital === 0) || (state.capital === undefined)) {
            const tasaInteres = ((monto * state.capital) - 1 ) / state.tiempo

            setState(prevState => ({
                ...prevState,
                interes: tasaInteres
            }));
        } else if ((state.tiempo === 0) || (state.tiempo === undefined)) {
            const tiempo = ((monto * state.capital) - 1 ) / state.interes

            setState(prevState => ({
                ...prevState,
                tiempo: tiempo
            }));
            
        }
    }
    return (
        <section className="bg-slate-200 rounded-[16px] text-center grid place-content-center max-w-[1000px] w-full aspect-auto mx-[0_auto] px-[0_32px]">

            <form onSubmit={onSubmit} >

                <InputControl labelName="Monto final"
                   inputName="monto"
                   type="number"
                   handleInputChange={handleInputChange}
                   value={monto}
                    />

                <InputControl labelName="Capital"
                    inputName="capital"
                    type="number"
                    handleInputChange={handleInputChange}
                    value={state.capital} />


                <InputControl labelName="Tasa de Interés (%)"
                inputName="interes"
                type="number"
                handleInputChange={handleInputChange}
                value={state.interes} />

       
                    <InputControl labelName="Interés" 
                    inputName="interesD"
                    type="number"
                    handleInputChange={handleInputChange2}
                    value={interesD}
                    />
                

             <select name="selectTypeDate" id="" onChange={selectElement}>
                    <option value="option" disabled>Seleccione una opción</option>
                    <option value="anio">Año</option>
                    <option value="intervalos">Intervalos</option>
                </select>

                {selectOption === 'anio' && (
                    <>
                    <InputControl labelName="Año"
                    type="number"
                         inputName="anio"
                         handleInputChange={handleInputChange3}
    
                         value={fechaEspecifica.anio} />
    
                        <InputControl labelName="Mes"
                        type="number"
                         inputName="mes"
                         handleInputChange={handleInputChange3}
                         value={fechaEspecifica.mes} />
    
                        <InputControl labelName="Día"
                        type="number"
                          inputName="dia"
                          handleInputChange={handleInputChange3}
                          value={fechaEspecifica.dia} />
    
                </>
                )}

                {selectOption === 'intervalos' && (
                    <>
                        <InputControl labelName="Fecha de Inicio"
                     inputName="fechaInicio"
                     type="date"
                     handleInputChange={handleSelectChange}
                     value={intervalo.fechaInicio.toString()}
                        />
                    <InputControl labelName="Fecha final"
                     inputName="fechaFin"
                     type="date"
                     handleInputChange={handleSelectChange} 
                     value={intervalo.fechaFin.toString()} />
                    </>
                )}

                <button type="submit"
                    className="bg-green-500 rounded-lg"
                    disabled={(!state.capital && !state.interes) || (!state.tiempo && !state.capital)} >Enviar</button>
                <div className="flex justify-end">
                    <h1 className="text-red-800">Result: <span>{result}</span></h1>
                </div>
               
            </form>

        </section>
    )
}


export default Form