export function MontoCompuesto(
  capital: number,
  tasaDecimal: number,
  tiempo: number
) {
  return capital * Math.pow(1 + tasaDecimal, tiempo);
}

export function CalculateN(
  monto: number,
  capital: number,
  tasa_interes_decimal: number
): number {
  const numerator = Math.log(monto) - Math.log(capital);
  const denominator = Math.log(1 + tasa_interes_decimal);
  const result = numerator / denominator;
  return Math.round(result * 100) / 100; // Redondear a 2 decimales
}

export function CalculatInteresCompuesto(mc: number, c: number, n: number) {
  const tasa_interes_decimal = Math.pow(mc / c, 1 / n) - 1;
  const tasa_interes = parseFloat(tasa_interes_decimal.toFixed(4));
  return tasa_interes;
}

export function CalcularCapitalCompuesto(mc: number, i: number, n: number) {
  const c = mc / Math.pow(1 + i, n);
  const cResultado = parseFloat(c.toString());
  return cResultado;
}
