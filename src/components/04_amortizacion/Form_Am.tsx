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

    const [resultadoPagoPeriodico, setResultadoPagoPeriodico] = useState<number | null>(null);
    const [resultadoInteresTotal, setResultadoInteresTotal] = useState<number | null>(null);
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
                const pagoPeriodico = calcularPagoPeriodicoLineal(montoPrestamo, tasaInteres, numeroPagos);
                const interesTotal = calcularInteresTotal(pagoPeriodico, numeroPagos, montoPrestamo);
                setResultadoPagoPeriodico(pagoPeriodico);
                setResultadoInteresTotal(interesTotal);
            } else if (tipoCalculo === TipoCalculo.Francesa) {
                const pagoPeriodico = calcularPagoPeriodicoFrancesa(montoPrestamo, tasaInteres, numeroPagos);
                const interesTotal = calcularInteresTotal(pagoPeriodico, numeroPagos, montoPrestamo);
                setResultadoPagoPeriodico(pagoPeriodico);
                setResultadoInteresTotal(interesTotal);
            } else if (tipoCalculo === TipoCalculo.Alemana) {
                const pagoPeriodico = calcularPagoPeriodicoAlemana(montoPrestamo, tasaInteres, numeroPagos, numeroPeriodo);
                const interesTotal = calcularInteresTotal(pagoPeriodico, numeroPagos, montoPrestamo);
                setResultadoPagoPeriodico(pagoPeriodico);
                setResultadoInteresTotal(interesTotal);
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

    const calcularInteresTotal = (pagoPeriodico: number, numeroPagos: number, montoPrestamo: number): number => {
        return pagoPeriodico * numeroPagos - montoPrestamo;
    };

    const truncateDecimal = (value: number | null): string => {
        if (value === null) return "";
        return value.toFixed(2);
    };

    const renderDescripcionAmortizacion = () => {
        switch (tipoCalculo) {
            case TipoCalculo.Lineal:
                return <p style={{ color: "black", textAlign: "justify" }}>La amortización lineal implica el pago de una cantidad constante de capital en cada periodo, acompañada por el pago de los intereses sobre el saldo pendiente.</p>;
            case TipoCalculo.Francesa:
                return <p style={{ color: "black", textAlign: "justify" }}>La amortización francesa implica el pago de cuotas constantes que incluyen capital e intereses. A medida que se amortiza el capital, los intereses a pagar van disminuyendo.</p>;
            case TipoCalculo.Alemana:
                return <p style={{ color: "black", textAlign: "justify" }}>La amortización alemana, también conocida como amortización alemana decreciente, implica el pago de cuotas decrecientes de capital acompañadas de intereses sobre el saldo pendiente.</p>;
            default:
                return null;
        }
    };
    
    

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2 border-[#967460] [&>input]:rounded-md [&>input]:p-2 [&>div]:flex [&>div]:justify-between [&>div]:item-center [&>div]:gap-4 [&>div>input]:rounded-md [&>div>input]:p-2">
            <div className="button-group">
                <button className={tipoCalculo === TipoCalculo.Lineal ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.Lineal)}>Amortización Lineal</button>
                <button className={tipoCalculo === TipoCalculo.Francesa ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.Francesa)}>Amortización Francesa</button>
                <button className={tipoCalculo === TipoCalculo.Alemana ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.Alemana)}>Amortización Alemana</button>
            </div>
            {renderDescripcionAmortizacion()}
            <InputControl labelName="Monto del Préstamo" inputName="montoPrestamo" handleInputChange={handleInputChange} value={state.montoPrestamo} type="number" className="" />
            <InputControl labelName="Tasa de Interés (%)" inputName="tasaInteres" handleInputChange={handleInputChange} value={state.tasaInteres} type="number" className="" />
            <InputControl labelName="Número de Pagos" inputName="numeroPagos" handleInputChange={handleInputChange} value={state.numeroPagos} type="number" className="" />
            {tipoCalculo === TipoCalculo.Alemana && (
                <InputControl labelName="Número del Período" inputName="numeroPeriodo" handleInputChange={handleInputChange} value={state.numeroPeriodo} type="number" className="" />
            )}
            <button type="submit" className="bg-orange-500 p-5 rounded-md cursor-pointer text-slate-100 font-semibold text-2xl hover:scale-105 duration-150">Calcular</button>
            {error && <p className="text-red-500">{error}</p>}
            {resultadoPagoPeriodico !== null && (
                <div>
                    <h1 className="text-black">Pago Periódico: <span>{truncateDecimal(resultadoPagoPeriodico)}</span></h1>
                    {resultadoInteresTotal !== null && (
                        <h1 className="text-black">Intereses Totales: <span>{truncateDecimal(resultadoInteresTotal)}</span></h1>
                    )}
                </div>
            )}
        </form>
    );
};

export default AmortizacionForm;
