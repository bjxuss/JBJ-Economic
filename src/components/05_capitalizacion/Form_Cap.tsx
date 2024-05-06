import React, { useState } from "react";

const CapitalizacionForm = () => {
    const [montoInicial, setMontoInicial] = useState(0);
    const [tasaInteres, setTasaInteres] = useState(0);
    const [tiempo, setTiempo] = useState(0);
    const [resultado, setResultado] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "montoInicial") setMontoInicial(parseFloat(value));
        if (name === "tasaInteres") setTasaInteres(parseFloat(value));
        if (name === "tiempo") setTiempo(parseFloat(value));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = calcularCapitalizacionInteresSimple(montoInicial, tasaInteres, tiempo);
            setResultado(response);
            setError(null);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Se produjo un error");
        }
    };

    const calcularCapitalizacionInteresSimple = (montoInicial: number, tasaInteres: number, tiempo: number): number => {
        const tasaInteresPeriodica = tasaInteres / 100 / tiempo;
        const capitalFinal = montoInicial * (1 + tasaInteresPeriodica * tiempo);
        return capitalFinal;
    };

    const truncateDecimal = (value: number | null): string => {
        if (value === null) return "";
        return value.toFixed(2);
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2 border-[#967460] [&>div]:flex [&>div]:justify-between [&>div]:item-center [&>div]:gap-4 [&>div>input]:rounded-md [&>div>input]:p-2">
            <div>
                <label htmlFor="montoInicial" className="text-black">Monto Inicial:</label>
                <input
                    type="number"
                    id="montoInicial"
                    name="montoInicial"
                    value={montoInicial}
                    onChange={handleInputChange}
                    className="rounded-md p-2"
                />
            </div>
            <div>
                <label htmlFor="tasaInteres" className="text-black">Tasa de Interés (%):</label>
                <input
                    type="number"
                    id="tasaInteres"
                    name="tasaInteres"
                    value={tasaInteres}
                    onChange={handleInputChange}
                    className="rounded-md p-2"
                />
            </div>
            <div>
                <label htmlFor="tiempo" className="text-black">Tiempo:</label>
                <input
                    type="number"
                    id="tiempo"
                    name="tiempo"
                    value={tiempo}
                    onChange={handleInputChange}
                    className="rounded-md p-2"
                />
            </div>
            <button type="submit" className="bg-orange-500 p-5 rounded-md cursor-pointer text-slate-100 font-semibold text-2xl hover:scale-105 duration-150">Calcular</button>
            {error && <p className="text-red-500">{error}</p>}
            {resultado !== null && (
                <p className="text-black">Capital Final: <span>{truncateDecimal(resultado)}</span></p>
            )}
        </form>
    );
};

export default CapitalizacionForm;
