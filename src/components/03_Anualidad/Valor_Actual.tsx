// Enum para la Frecuencia de Pago
export enum FrecuenciaPago {
  Mensual = 12,
  Trimestral = 12,
  Semestral = 12,
  Anual = 12
}

// Función para calcular el valor presente de una serie de pagos periódicos (anualidades)
export function AnualidadesVa(capital: number, interes: number, tiempo: number, frecuencia: FrecuenciaPago): number {
  // Validaciones de entrada
  
  const tasa_interes_porcental: number = interes / 100;
  // Convertir el tiempo a la frecuencia de pago
  const convertirTiempo: number = tiempo * frecuencia / 12;
  // Cálculo del valor presente de las anualidades
  const anualidades: number = capital * ( (1- (1 + tasa_interes_porcental) ** -convertirTiempo ) )/ tasa_interes_porcental;

  return anualidades;
}

// Función para calcular el valor futuro de una serie de pagos periódicos (anualidades)
export function AnualidadesVf(capital: number, interes: number, tiempo: number, frecuencia: FrecuenciaPago): number {
  // Validaciones de entrada
  
  // Cálculo de la tasa de interés por período
  const tasa_interes_porcental: number = interes / 100;
  // Convertir el tiempo a la frecuencia de pago
  const convertirTiempo: number = tiempo * frecuencia / 12;
  // Cálculo del valor futuro de las anualidades
  const valorFuturo: number = capital * ((1 + tasa_interes_porcental) ** convertirTiempo - 1) / tasa_interes_porcental;

  return valorFuturo;
}




// Función para calcular el monto (valor futuro) de una serie de pagos periódicos (anualidades)
export function calcularMontoAnualidad(valorFuturo: number, interes: number, tiempo: number, frecuencia: FrecuenciaPago): number {
  // Validaciones de entrada

  // Cálculo de la tasa de interés por período
  const tasa_interes_porcental: number = interes / 100;
  // Convertir el tiempo a la frecuencia de pago
  const convertirTiempo: number = tiempo * frecuencia / 12;
  // Cálculo del monto (valor futuro) de las anualidades
  const montoAnualidad: number = valorFuturo * tasa_interes_porcental / ((1 + tasa_interes_porcental) ** convertirTiempo - 1);

  return montoAnualidad;
}
