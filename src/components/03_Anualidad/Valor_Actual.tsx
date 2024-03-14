export enum FrecuenciaPago {
  Mensual = 12,
  Trimestral = 12,
  Semestral = 12,
  Anual = 12
}

//funcion para calcular el valor presente o monto de una anualidad ordinaria funcion provada
export function AnualidadesVa(capital: number, interes: number, tiempo: number, frecuencia: FrecuenciaPago): number {
  const tasa_interes_porcental: number = interes / 100;
  // Convertir el tiempo a la frecuencia de pago
  const convertirTiempo: number = tiempo * frecuencia / 12;
  // Cálculo del valor presente de las anualidades
  const anualidades: number = capital / (((1 + tasa_interes_porcental) ** convertirTiempo - 1) / tasa_interes_porcental);
  return anualidades;
}

// Función para calcular el valor futuro de una anualidad ordinaria funcion provada
export function AnualidadesVf(capital: number, interes: number, tiempo: number, frecuencia: FrecuenciaPago): number {
  // Cálculo de la tasa de interés por período
  const tasa_interes_porcental: number = interes / 100;
  // Convertir el tiempo a la frecuencia de pago
  const convertirTiempo: number = tiempo * frecuencia / 12;
  // Cálculo del valor futuro de las anualidades
  const valorFuturo: number = capital * ((1 + tasa_interes_porcental) ** convertirTiempo - 1) / tasa_interes_porcental;

  return valorFuturo;
}




// Función para calcular el monto (valor futuro) de una serie de pagos periódicos (anualidades simples)
export function calcularMontoAnualidad(capital: number, interes: number, tiempo: number, frecuencia: FrecuenciaPago): number {
  // Cálculo de la tasa de interés por período
  const tasa_interes_porcental: number = interes / 100;
  // Convertir el tiempo a la frecuencia de pago
  const convertirTiempo: number = tiempo * frecuencia / 12;
  // Cálculo del factor de anualidad
  const factorAnualidad: number = (1 - Math.pow(1 + tasa_interes_porcental, -convertirTiempo)) / tasa_interes_porcental;
  // Cálculo del monto (valor futuro) de las anualidades
  const montoAnualidad: number = capital * factorAnualidad;
  return montoAnualidad;
}




export function calcularCapital(capital: number, interes: number, tiempo: number, ): number {
 
  // Convertir la tasa de interés a formato decimal
  const tasaInteresDecimal: number = interes / 100;
  // Calcular el valor presente de la anualidad simple
  const capitalan: number = capital * ((1 - Math.pow(1 + tasaInteresDecimal/12, -tiempo)) / tasaInteresDecimal/12);
  return capitalan;
}
