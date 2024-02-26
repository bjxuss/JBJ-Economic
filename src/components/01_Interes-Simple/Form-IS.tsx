//hooks react
import { ChangeEvent, useState } from "react";
import { Interes_Simple } from "./Valor_Futuro";
import InputControl from "../Global/InputControl";


interface Interes {
    capital: number,
    interes: number,
    tiempo: number,
}



const Form = () => {

    //estado de la interface
    const [state, setState] = useState<Interes>({
        capital: 0,
        interes: 0,
        tiempo: 0,
    })

    //Estado del resultado
    const [result, setResult] = useState<number>(0)


    // Metodo para obtener el valor del input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

        const { name, value } = event.target;

        setState(prevState => ({
            ...prevState,
            [name]: parseFloat(value),
        }));

    }



    // Funcion para enviar los datos
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(state.capital + " - " + state.interes + " - " + state.tiempo);
        const response = Interes_Simple(state.capital, state.interes, state.tiempo)
        console.log(response);

        setResult(response)
    }
    return (
        <section className="bg-slate-200 rounded-[16px] text-center grid place-content-center max-w-[1000px] w-full aspect-auto mx-[0_auto] px-[0_32px]">

            <form onSubmit={onSubmit} >

                <InputControl labelName="Monto final"
                   inputName="monto"
                   handleInputChange={handleInputChange}
                    />

                <InputControl labelName="Capital"
                    inputName="capital"
                    handleInputChange={handleInputChange}
                    value={state.capital} />


                <InputControl labelName="Tasa de Interés (%)"
                inputName="interes"
                handleInputChange={handleInputChange}
                value={state.interes} />

                <div className="block">


                    <InputControl labelName="Año"
                     inputName="tiempo"
                     handleInputChange={handleInputChange}
                     value={state.tiempo} />

                    <label htmlFor="" className="text-stone-900">Mes</label>
                    <input type="number" name="tiempo" onChange={handleInputChange} value={state.tiempo}
                        className="bg-slate-200 text-stone-900 px-3 py-2 rounded-lg block mb-2 w-full" />

                    <label htmlFor="" className="text-stone-900">Dia</label>
                    <input type="number" name="tiempo" onChange={handleInputChange} value={state.tiempo}
                        className="bg-slate-200 text-stone-900 px-3 py-2 rounded-lg block mb-2 w-full" />


                </div>

                <button type="submit"
                    className="bg-green-500 rounded-lg"
                    disabled={(!state.capital && !state.interes) || (!state.tiempo && !state.capital)} >Enviar</button>

                <h1 className="text-white">Interes: <span>{result}</span></h1>

            </form>

        </section>
    )
}

export default Form