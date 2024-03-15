const general: number = 16441.00;

export enum TitulosU {
    medicos = 183,
    otros = 178,
}

export function total_general(general: number, Titulos: TitulosU): number {
    let totalTitulos = 0;

    if (Titulos === TitulosU.medicos) {
        totalTitulos = general * TitulosU.medicos;
    } else if (Titulos === TitulosU.otros) {
        totalTitulos = general * TitulosU.otros;
    }

    return totalTitulos;
}


