export function calcularTIR(flujosCaja: number[], tasaEstimada: number = 0.1, epsilon: number = 1e-6, maxIter: number = 1000): number {
    let tasa: number = tasaEstimada;
    let iter: number = 0;

    while (iter < maxIter) {
        let vpn: number = 0;
        let derivadaVpn: number = 0;

        for (let i = 0; i < flujosCaja.length; i++) {
            const flujo: number = flujosCaja[i];
            console.log("Flujo " , i + 1, " --> ", flujo)
            const factorDescuento: number = Math.pow(1 + tasa, i);
            console.log("fD --> ", factorDescuento)

            vpn += flujo / factorDescuento;
            derivadaVpn -= i * flujo / (factorDescuento * (1 + tasa));
        }

        const nuevaTasa: number = tasa - vpn / derivadaVpn;
        console.log("New CUp -->", nuevaTasa)

        if (Math.abs(nuevaTasa - tasa) < epsilon) {
            const tir_round: number = parseFloat(nuevaTasa.toFixed(4))
            console.log(tir_round)
            const tir: number = tir_round * 100 
            return tir;
        }

        tasa = nuevaTasa;
        iter++;
    }

    return 0; // No se encontró la TIR después de maxIter iteraciones
}


//  ! Ejemplo de uso
// * const flujosCaja: number[] = [-150000, 100000, 80000, 0]; // Inversión inicial de 100 y 4 pagos de 40
// * const tasaEstimada: number = 0; // Tasa estimada inicial del 10%

// * const tir: number | null = calcularTIR(flujosCaja, tasaEstimada);
// * console.log(tir);

export function calcularVAN(flujosCaja: number[], inversionInicial: number, tasaDescuento: number = 0 ): number{

    let van = inversionInicial; // Se resta la inversión inicial
  for (let i = 1; i < flujosCaja.length; i++) {
    const flujo = flujosCaja[i];
    console.log("Flujo ", i , "--> ", flujo)
    van += flujo / Math.pow(1 + tasaDescuento, i + 1 - 1 ); // Se descuentan los flujos de caja
  }

  return van;
}

// const flujosCaja: number[] = [-50, 20, 40]
// const inversionInicial: number = flujosCaja[0]
// const tasaDescuento: number = 0.03

// const VAN: number = calcularVAN(flujosCaja, inversionInicial, tasaDescuento)
// console.log(VAN)