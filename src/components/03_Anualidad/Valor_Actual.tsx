// Enum para la Frecuencia de Pago
export enum FrecuenciaPago {
  Mensual = 12,
  Trimestral = 4,
  Semestral = 2,
  Anual = 1
}

// Función para calcular el valor presente de una serie de pagos periódicos (anualidades)
export function AnualidadesVa(capital: number, interes: number, tiempo: number, frecuencia: FrecuenciaPago): number {
  // Validaciones de entrada
  if (isNaN(capital) || capital <= 0) {
      throw new Error("El capital debe ser un número positivo");
  }
  if (isNaN(interes) || interes < 0) {
      throw new Error("La tasa de interés debe ser un número positivo");
  }
  if (isNaN(tiempo) || tiempo <= 0) {
      throw new Error("El tiempo debe ser un número positivo");
  }

  // Cálculo de la tasa de interés por período
  const tasa_interes_porcental: number = interes / 100;
  // Convertir el tiempo a la frecuencia de pago
  const convertirTiempo: number = tiempo * frecuencia / 12;
  // Cálculo del valor presente de las anualidades
  const anualidades: number = capital * ((1 + tasa_interes_porcental) ** convertirTiempo - 1) / tasa_interes_porcental;

  return anualidades;
}

// Función para calcular el valor futuro de una serie de pagos periódicos (anualidades)
export function AnualidadesVf(capital: number, interes: number, tiempo: number, frecuencia: FrecuenciaPago): number {
  // Validaciones de entrada
  if (isNaN(capital) || capital <= 0) {
      throw new Error("El capital debe ser un número positivo");
  }
  if (isNaN(interes) || interes < 0) {
      throw new Error("La tasa de interés debe ser un número positivo");
  }
  if (isNaN(tiempo) || tiempo <= 0) {
      throw new Error("El tiempo debe ser un número positivo");
  }

  // Cálculo de la tasa de interés por período
  const tasa_interes_porcental: number = interes / 100;
  // Convertir el tiempo a la frecuencia de pago
  const convertirTiempo: number = tiempo * frecuencia / 12;
  // Cálculo del valor futuro de las anualidades
  const valorFuturo: number = capital * ((1 + tasa_interes_porcental) ** convertirTiempo);

  return valorFuturo;
}




// Función para calcular el monto (valor futuro) de una serie de pagos periódicos (anualidades)
export function calcularMontoAnualidad(valorFuturo: number, interes: number, tiempo: number, frecuencia: FrecuenciaPago): number {
  // Validaciones de entrada
  if (isNaN(valorFuturo) || valorFuturo <= 0) {
      throw new Error("El valor futuro debe ser un número positivo");
  }
  if (isNaN(interes) || interes < 0) {
      throw new Error("La tasa de interés debe ser un número positivo");
  }
  if (isNaN(tiempo) || tiempo <= 0) {
      throw new Error("El tiempo debe ser un número positivo");
  }

  // Cálculo de la tasa de interés por período
  const tasa_interes_porcental: number = interes / 100;
  // Convertir el tiempo a la frecuencia de pago
  const convertirTiempo: number = tiempo * frecuencia / 12;
  // Cálculo del monto (valor futuro) de las anualidades
  const montoAnualidad: number = valorFuturo * tasa_interes_porcental / ((1 + tasa_interes_porcental) ** convertirTiempo - 1);

  return montoAnualidad;
}
