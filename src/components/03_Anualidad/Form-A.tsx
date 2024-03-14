import React, { ChangeEvent, FormEvent, useState } from "react";
import { AnualidadesVa, AnualidadesVf, calcularCapital, calcularMontoAnualidad, FrecuenciaPago } from "./Valor_Actual";
import InputControl from "../Global/InputControl";
import "./style.css";
import vfordinaria from "./img/vfordinarias.png"
import vasimples from "./img/vasimples.png"
import vaordinaria from "./img/vaordinaria.png"
import vfsimple from "./img/vfsilmple.png"
interface Anualidades {
    capital: number,
    interes: number,
    tiempo: number,
    frecuenciaPago: FrecuenciaPago
}

enum TipoCalculo {
    ValorPresente,
    ValorFuturo,
    Monto,
    Capital
}

const AnualidadesForm = () => {
    const [state, setState] = useState<Anualidades>({
        capital: 0,
        interes: 0,
        tiempo: 0,
        frecuenciaPago: FrecuenciaPago.Anual 
    });

    const [resultVa, setResultVa] = useState<number | null>(null);
    const [resultVf, setResultVf] = useState<number | null>(null);
    const [resultMonto, setResultMonto] = useState<number | null>(null);
    const [resultCapital, setResultCapital] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [tipoCalculo, setTipoCalculo] = useState<TipoCalculo>(TipoCalculo.ValorPresente);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: name === "frecuenciaPago" ? parseInt(value) : parseFloat(value),
        }));
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { capital, interes, tiempo, frecuenciaPago } = state;
        
        try {
            if (tipoCalculo === TipoCalculo.ValorPresente) {
                const responseVa = AnualidadesVa(capital, interes, tiempo, frecuenciaPago);
                setResultVa(responseVa);
            } else if (tipoCalculo === TipoCalculo.ValorFuturo) {
                const responseVf = AnualidadesVf(capital, interes, tiempo, frecuenciaPago);
                setResultVf(responseVf);
            } else if (tipoCalculo === TipoCalculo.Monto) {
                const responseMonto = calcularMontoAnualidad(capital, interes, tiempo, frecuenciaPago);
                setResultMonto(responseMonto);
            } else if (tipoCalculo === TipoCalculo.Capital) {
                const responseCapital = calcularCapital(capital, interes, tiempo);
                setResultCapital(responseCapital);
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

    const getDescripcion = (tipo: TipoCalculo): JSX.Element => {
        switch (tipo) {
            case TipoCalculo.ValorPresente:
                return (
                    <>
                        <p>
                            El Valor Presente (VP) es el valor actual de una serie de flujos de efectivo futuros,
                            descontados a una tasa de interés específica. Representa cuánto vale una cantidad de
                            dinero en el presente, considerando su valor futuro y la tasa de descuento aplicada.
                        </p>
                        <img style={{display:"block", margin:"auto"}} src={vaordinaria} alt="Descripción Valor Presente" />
                    </>
                );
            case TipoCalculo.ValorFuturo:
                return (
                    <>
                        <p>
                            El Valor Futuro (VF) es el valor que una inversión tendrá en el futuro, después de
                            acumular intereses o rendimientos a lo largo del tiempo. Representa la cantidad total que
                            se espera que una inversión crezca, incluyendo tanto el principal inicial como los
                            intereses o rendimientos generados.
                        </p>
                        <img style={{display:"block", margin:"auto"}} src={vfordinaria} alt="Descripción Valor Futuro" />
                    </>
                );
            case TipoCalculo.Monto:
                return (
                    <>
                        <p>
                            El Monto de la Anualidad es el valor total de todos los pagos realizados o recibidos en
                            una serie de pagos periódicos iguales, conocidos como anualidades. Es la suma de todos los
                            pagos, incluyendo tanto el capital inicial como los intereses generados durante el período
                            de tiempo especificado.
                        </p>
                        <p>La fórmula para calcular el monto es:</p>
                        <img style={{display:"block", margin:"auto"}} src={vasimples} alt="Fórmula Monto" />
                    </>
                );
            case TipoCalculo.Capital:
                return (
                    <>
                        <p>
                            El Capital Inicial es la cantidad de dinero que se invierte inicialmente para generar una
                            renta o un flujo de efectivo futuro.
                        </p>
                        <img style={{display:"block", margin:"auto"}} src={vfsimple} alt="Descripción Capital Inicial" />
                    </>
                );
            default:
                return <></>;
        }
    };
    
    return (
        <section className="bg-slate-200 rounded-[16px] text-center grid place-content-center max-w-[1000px] w-full aspect-auto mx-[0_auto] px-[0_32px]">
            <div className="button-group">
                <button className={tipoCalculo === TipoCalculo.ValorPresente ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.ValorPresente)}>Calcular VP </button>
                <button className={tipoCalculo === TipoCalculo.ValorFuturo ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.ValorFuturo)}>Calcular VF </button>
                <button className={tipoCalculo === TipoCalculo.Monto ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.Monto)}>Calcular Monto </button>
                <button className={tipoCalculo === TipoCalculo.Capital ? "active" : ""} onClick={() => setTipoCalculo(TipoCalculo.Capital)}>Calcular Capital</button>
            </div>
            <div className="description">
                {getDescripcion(tipoCalculo)}
            </div>
            <form onSubmit={onSubmit}>
                <InputControl labelName="Capital" inputName="capital" handleInputChange={handleInputChange} value={state.capital} type={""} />
                <InputControl labelName="Tasa de Interés (%)" inputName="interes" handleInputChange={handleInputChange} value={state.interes} type={"number"} />
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
                {error && <p className="text-red-500">{error}</p>}
                {tipoCalculo === TipoCalculo.ValorPresente && resultVa !== null && (
                    <h1 className="text-black">Valor Actual de las Anualidades: <span>{truncateDecimal(resultVa)}</span></h1>
                )}
                {tipoCalculo === TipoCalculo.ValorFuturo && resultVf !== null && (
                    <h1 className="text-black">Valor Futuro de las Anualidades: <span>{truncateDecimal(resultVf)}</span></h1>
                )}
                {tipoCalculo === TipoCalculo.Monto && resultMonto !== null && (
                    <h1 className="text-black">Monto de las Anualidades: <span>{truncateDecimal(resultMonto)}</span></h1>
                )}
                {tipoCalculo === TipoCalculo.Capital && resultCapital !== null && (
                    <h1 className="text-black">Capital Inicial: <span>{truncateDecimal(resultCapital)}</span></h1>
                )}
            </form>
        </section>
    );
};

export default AnualidadesForm;
