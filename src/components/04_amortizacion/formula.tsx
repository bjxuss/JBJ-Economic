// Función para calcular el pago periódico en un préstamo con amortización lineal
export function calcularPagoPeriodicoLineal(montoTotal: number, tasaInteres: number, numeroPagos: number): number {
    const tasaInteresPeriodica = tasaInteres / 100;
    const pagoPeriodico = (montoTotal / numeroPagos) + tasaInteresPeriodica * (montoTotal - ((numeroPagos - 1) * (montoTotal / numeroPagos))) / numeroPagos;
    return pagoPeriodico;
  }
  
  // Función para calcular el pago periódico en un préstamo con amortización francesa
  export function calcularPagoPeriodicoFrancesa(montoPrestamo: number, tasaInteres: number, numeroPagos: number): number {
    const tasaInteresPeriodica = tasaInteres / 100;
    const pagoPeriodico = (montoPrestamo * tasaInteresPeriodica) / (1 - Math.pow(1 + tasaInteresPeriodica, -numeroPagos));
    return pagoPeriodico;
  }
  
  // Función para calcular el pago periódico en un préstamo con amortización alemana
  export function calcularPagoPeriodicoAlemana(montoPrestamo: number, tasaInteres: number, numeroPagos: number, numeroPeriodo: number): number {
    const tasaInteresPeriodica = tasaInteres / 100;
    const pagoPeriodico = (montoPrestamo / numeroPagos) + tasaInteresPeriodica * (montoPrestamo - (numeroPeriodo - 1) * (montoPrestamo / numeroPagos));
    return pagoPeriodico;
  }
  