
  
export function calcularCapitalizacionInteresSimple(montoInicial: number, tasaInteres: number, tiempo: number ) {
    const tasaInteresPeriodica = tasaInteres / 100 / tiempo;
    const capitalFinal = montoInicial * (1 + tasaInteresPeriodica * tiempo);
    return capitalFinal;
  }