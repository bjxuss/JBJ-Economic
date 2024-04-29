import React, { ChangeEvent, FormEvent, useState } from "react";
import InputControl from "../Global/InputControl";
import { calcularPagoPeriodicoLineal, calcularPagoPeriodicoFrancesa, calcularPagoPeriodicoAlemana } from "./formula";

interface Amortizacion {
    montoPrestamo: number,
    tasaInteres: number,
    numeroPagos: number,
    numeroPeriodo: number
}

enum TipoCalculo {
    Lineal,
    Francesa,
    Alemana
}

const AmortizacionForm = () => {
    const [state, setState] = useState<Amortizacion>({
        montoPrestamo: 0,
        tasaInteres: 0,
        numeroPagos: 0,
        numeroPeriodo: 0
    });

    const [resultado, setResultado] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [tipoCalculo, setTipoCalculo] = useState<TipoCalculo>(TipoCalculo.Lineal);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: parseFloat(value),
        }));
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { montoPrestamo, tasaInteres, numeroPagos, numeroPeriodo } = state;
        
        try {
            if (tipoCalculo === TipoCalculo.Lineal) {
                const response = calcularPagoPeriodicoLineal(montoPrestamo, tasaInteres, numeroPagos);
                setResultado(response);
            } else if (tipoCalculo === TipoCalculo.Francesa) {
                const response = calcularPagoPeriodicoFrancesa(montoPrestamo, tasaInteres, numeroPagos);
                setResultado(response);
            } else if (tipoCalculo === TipoCalculo.Alemana) {
                const response = calcularPagoPeriodicoAlemana(montoPrestamo, tasaInteres, numeroPagos, numeroPeriodo);
                setResultado(response);
            }
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Se produjo un error");
            }
        }
    };

    const truncateDecimal = (value: number | null): string => {
        if (value === null) return "";
        return value.toFixed(2);
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2 border-[#967460] [&>input]:rounded-md [&>input]:p-2 [&>div]:flex [&>div]:justify-between [&>div]:item-center [&>div]:gap-4 [&>div>input]:rounded-md [&>div>input]:p-2">
            <div className="button-group">
                <button className={tipoCalculo === TipoCalculo.Lineal ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.Lineal)}>Amortización Lineal</button>
                <button className={tipoCalculo === TipoCalculo.Francesa ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.Francesa)}>Amortización Francesa</button>
                <button className={tipoCalculo === TipoCalculo.Alemana ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.Alemana)}>Amortización Alemana</button>
            </div>
            <InputControl labelName="Monto del Préstamo" inputName="montoPrestamo" handleInputChange={handleInputChange} value={state.montoPrestamo} type="number" className="" />
            <InputControl labelName="Tasa de Interés (%)" inputName="tasaInteres" handleInputChange={handleInputChange} value={state.tasaInteres} type="number" className="" />
            <InputControl labelName="Número de Pagos" inputName="numeroPagos" handleInputChange={handleInputChange} value={state.numeroPagos} type="number" className="" />
            {tipoCalculo === TipoCalculo.Alemana && (
                <InputControl labelName="Número del Período" inputName="numeroPeriodo" handleInputChange={handleInputChange} value={state.numeroPeriodo} type="number" className="" />
            )}
            <button type="submit" className="bg-orange-500 p-5 rounded-md cursor-pointer text-slate-100 font-semibold text-2xl hover:scale-105 duration-150">Calcular</button>
            {error && <p className="text-red-500">{error}</p>}
            {resultado !== null && (
                <h1 className="text-black">Pago Periódico: <span>{truncateDecimal(resultado)}</span></h1>
            )}
        </form>
    );
};

export default AmortizacionForm;
    