import { ChangeEvent, useState } from "react";
import { AnualidadesVa } from "./Valor_Actual";
import InputControl from "../Global/InputControl";

interface Anualidades {
    capital: number,
    interes: number,
    tiempo: number,
}

const AnualidadesForm = () => {
    const [state, setState] = useState<Anualidades>({
        capital: 0,
        interes: 0,
        tiempo: 0,
    });

    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: parseFloat(value),
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = AnualidadesVa(state.capital, state.interes, state.tiempo);
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
                <InputControl labelName="Capital" inputName="capital" handleInputChange={handleInputChange} value={state.capital} />
                <InputControl labelName="Tasa de Interés (%)" inputName="interes" handleInputChange={handleInputChange} value={state.interes} />
                <InputControl labelName="Tiempo (en meses)" inputName="tiempo" handleInputChange={handleInputChange} value={state.tiempo} />
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

