export function AnualidadesVa(capital:number,interes:number, tiempo:number) {
    
    if (isNaN(capital) || capital <= 0) {
        throw new Error("El capital debe ser un número positivo");
      }
      if (isNaN(interes) || interes < 0) {
        throw new Error("La tasa de interés debe ser un número positivo");
      }
      if (isNaN(tiempo) || tiempo <= 0) {
        throw new Error("El tiempo debe ser un número positivo");
      }    
    const tasa_interes_porcental:number = interes / 100;

        const convertirTiempo:number = tiempo / 12;

        const anualidades = capital* (1-(1+tasa_interes_porcental)** -convertirTiempo )/tasa_interes_porcental;

        return anualidades 
} 