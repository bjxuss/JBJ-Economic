export function Interes_Simple(capital:number,tasa_interes:number, tiempo:number) {
    
    const tasa_interes_porcental:number = tasa_interes / 100

        const convertirTiempo:number = tiempo / 12

        const interesSimple = capital * tasa_interes_porcental * convertirTiempo

        return interesSimple 

} 


