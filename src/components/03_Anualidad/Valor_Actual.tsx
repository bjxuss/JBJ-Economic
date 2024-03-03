export enum FrecuenciaPago {
  Mensual = 12,
  Trimestral = 4,
  Semestral = 2,
  Anual = 1
}

export function AnualidadesVa(capital: number, interes: number, tiempo: number, frecuencia: FrecuenciaPago): number {
  if (isNaN(capital) || capital <= 0) {
      throw new Error("El capital debe ser un número positivo");
  }
  if (isNaN(interes) || interes < 0) {
      throw new Error("La tasa de interés debe ser un número positivo");
  }
  if (isNaN(tiempo) || tiempo <= 0) {
      throw new Error("El tiempo debe ser un número positivo");
  }

  const tasa_interes_porcental: number = interes / 100;
  const convertirTiempo: number = tiempo * frecuencia / 12;
  const anualidades: number = capital * ((1 + tasa_interes_porcental) ** convertirTiempo - 1) / tasa_interes_porcental;

  return anualidades;
}
