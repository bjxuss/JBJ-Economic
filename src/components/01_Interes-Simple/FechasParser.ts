// Funcion para convertir intervalos de fechas a años
export const FormatDate = (FechaI: string, FechaF: string) => {

    const FechaIncio: number = new Date(FechaI).getTime()
    const fechaFinal: number = new Date(FechaF).getTime()

    const diferencia = fechaFinal - FechaIncio;

    const convertirDias = diferencia / (1000 * 60 * 60 * 24) // Milisegundos -> segundos -> minutos -> horas -> Días

    const convertirAños = convertirDias / 365


    return convertirAños
}

// Función para convertir fecha especificas a años
export const FormatDMA = (anio: number, mes: number, dia: number) => {

    const años = anio + (mes / 12) + (dia / 360)
    return años
}

export function calcularEquivalenciaTiempo(valor: number): { años: number, meses: number, días: number } {

    const parteEntera = Math.floor(valor)
    console.log(parteEntera);
    
    // Calcular la parte fraccionaria
    const parteFraccionaria = valor - parteEntera;
    // Calcular la equivalencia en días
    const equivalenciaDias = parteFraccionaria * 360;
    // Calcular los años y meses
    const años = parteEntera
    const meses = Math.floor((equivalenciaDias % 360) / 30);
    const días = Math.floor((equivalenciaDias % 360) % 30);

    return { años, meses, días };
}