import React, { ChangeEvent, FormEvent, useState } from "react";
import { AnualidadesVa, AnualidadesVf, calcularMontoAnualidad, FrecuenciaPago } from "./Valor_Actual";
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

    const [resultVa, setResultVa] = useState<number | null>(null);
    const [resultVf, setResultVf] = useState<number | null>(null);
    const [resultMonto, setResultMonto] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: name === "frecuenciaPago" ? parseInt(value) : parseFloat(value), // Si es frecuenciaPago, convertir a entero
        }));
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { capital, interes, tiempo, frecuenciaPago } = state;
        if (capital === 0 || interes === 0 || tiempo === 0) {
            setError("Por favor, complete todos los campos");
            return;
        }
        try {
            const responseVa = AnualidadesVa(capital, interes, tiempo, frecuenciaPago);
            setResultVa(responseVa);
            const responseVf = AnualidadesVf(capital, interes, tiempo, frecuenciaPago);
            setResultVf(responseVf);
            const responseMonto = calcularMontoAnualidad(responseVf, interes, tiempo, frecuenciaPago);
            setResultMonto(responseMonto);
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
                <button type="submit" className="bg-green-500 rounded-lg">Calcular</button>
                {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error si existe */}
                {resultVa !== null && (
                    <h1 className="text-black">Valor Actual de las Anualidades: <span>{resultVa}</span></h1>
                )}
                {resultVf !== null && (
                    <h1 className="text-black">Valor Futuro de las Anualidades: <span>{resultVf}</span></h1>
                )}
                {resultMonto !== null && (
                    <h1 className="text-black">Monto de las Anualidades: <span>{resultMonto}</span></h1>
                )}
            </form>
        </section>
    );
};

export default AnualidadesForm;
