import React, { ChangeEvent, useState } from "react";
import { AnualidadesVa, FrecuenciaPago } from "./Valor_Actual";
import InputControl from "../Global/InputControl";

interface Anualidades {
    capital: number,
    interes: number,
    tiempo: number,
    frecuenciaPago: FrecuenciaPago
}

const AnualidadesForm = () => {
    const [state, setState] = useState<Anualidades>({
        capital: 0,
        interes: 0,
        tiempo: 0,
        frecuenciaPago: FrecuenciaPago.Anual // Valor predeterminado
    });

    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: name === "frecuenciaPago" ? parseInt(value) : parseFloat(value), // Si es frecuenciaPago, convertir a entero
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = AnualidadesVa(state.capital, state.interes, state.tiempo, state.frecuenciaPago); // Pasar frecuenciaPago como argumento
            setResult(response);
            setError(null); // Limpiar errores si no hay excepciones
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message); // Si es una instancia de Error, establecer el mensaje de error
            } else {
                setError("Se produjo un error"); // De lo contrario, mostrar un mensaje genérico
            }
        }
    };

    return (
        <section className="bg-slate-200 rounded-[16px] text-center grid place-content-center max-w-[1000px] w-full aspect-auto mx-[0_auto] px-[0_32px]">
            <form onSubmit={onSubmit}>
                <InputControl labelName="Capital" inputName="capital" handleInputChange={handleInputChange} value={state.capital} type={""} />
                <InputControl labelName="Tasa de Interés (%)" inputName="interes" handleInputChange={handleInputChange} value={state.interes} type={""} />
                <InputControl labelName="Periodos" inputName="tiempo" handleInputChange={handleInputChange} value={state.tiempo} type={""} />
                <div>
                    <label htmlFor="frecuenciaPago">Frecuencia de Pago:</label>
                    <select name="frecuenciaPago" onChange={handleInputChange} value={state.frecuenciaPago}>
                        <option value={FrecuenciaPago.Mensual}>Mensual</option>
                        <option value={FrecuenciaPago.Trimestral}>Trimestral</option>
                        <option value={FrecuenciaPago.Semestral}>Semestral</option>
                        <option value={FrecuenciaPago.Anual}>Anual</option>
                    </select>
                </div>
                <button type="submit" className="bg-green-500 rounded-lg">Calcular Valor Actual</button>
                {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error si existe */}
                {result !== null && (
                    <h1 className="text-black">Valor Actual de las Anualidades: <span>{result}</span></h1>
                )}
            </form>
        </section>
    );
};

export default AnualidadesForm;
