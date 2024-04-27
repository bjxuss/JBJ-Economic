// Fórmulas para la Gradiente Aritmética

export const calcularValorPresente = (c1: number, L: number, ip: number, n: number, cod: string): number => {
    const repeat_part = ((1 - Math.pow(1 + ip, -n)) / ip)
    const parte1 = c1 * repeat_part
    const parte2 = (L / ip) * (repeat_part - n * Math.pow(1 + ip, -n));

    console.log("cod vale: ",cod);
    

    if (cod === "1"){
      return parte1 + parte2;
    }else{
      return parte1 - parte2;
    }
    
}

export const calcularValorFuturo = (c1: number, L: number, i: number, n: number, cod: string): number => {
  const parte1 = c1 * (((1 + i) ** n - 1) / i);
  const parte2 = (L / i) * ((((1 + i) ** n - 1) / i) - n);

  if (cod === "1"){
    return parte1 + parte2;
  }else{
    return parte1 - parte2;
  }
}

