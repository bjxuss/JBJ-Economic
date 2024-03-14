import { calcularEquivalenciaTiempo } from "./FechasParser";

export function Interes_Simple(capital: number, tasa_interes: number, tiempo: number) {

    const tasa_interes_porcental: number = tasa_interes / 100
    console.log(tasa_interes_porcental);

    const interesSimple = capital * tasa_interes_porcental * tiempo

    return interesSimple

}

export function Capital(interes: number, tasa_interes: number, tiempo: number) {
    const tasa_interes_porcental: number = tasa_interes / 100

    const capital = interes / (tasa_interes_porcental * tiempo)

    return capital
}

export function tiempo(interes: number, capital: number, tasa_interes: number) {
    const tasa_interes_porcental: number = tasa_interes / 100

    const tiempo = interes / (tasa_interes_porcental * capital)

    const tiempo_especifico = calcularEquivalenciaTiempo(tiempo)

    return tiempo_especifico

}

export function valor_Futuro(tasa_interes: number, capital: number, tiempo: number) {

    const interesP = tasa_interes / 100

    const valorFuturo = capital * (1 + (interesP * tiempo))

    // Redondea a dos cifras decimales
    const redondeado = Math.round(valorFuturo * 100) / 100;

    return redondeado

}

export function valor_presente(tasa_interes: number,interes: number,tiempo: number) {

    const interesP = tasa_interes / 100

    const valorPresente = (interes) / ( 1 + (interesP * tiempo))

    return valorPresente

}

export function tasa_interes(interes:number, capital:number, tiempo: number) {
    
    const tasaInteres = (interes) / (capital * tiempo)

    const tasa_interes_porcental = tasaInteres * 100


    const redondeado = Math.round(tasa_interes_porcental * 100) / 100;

    return redondeado

}

export function interes(monto: number, capital: number) {

    const diff = monto - capital

    return diff
    
}