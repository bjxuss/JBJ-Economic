/*
    a = cantidad de dinero en el año
    i = tasa de interés
    n = # de cuotas ó de periodos
    g = incremento porcentual 
*/ 

export const calculatePresentValue = (a: number, i: number, g: number, n: number, cod: string): number =>{
    if (g != i)
        if (cod === "1")
            return a * ((1 - ((Math.pow(1 + g, n)) / (Math.pow(1 + i, n)))) / (i - g));
        else{
            return a * ((1 - ((Math.pow(1 - g, n)) / (Math.pow(1 + i, n)))) / (i + g));
        }
    else{
        if (cod === "1") {
            return a / (1 + i)            
        } else {
            return a / (1 - i)
        }
    }
}

export const calculateFutureValue = (a: number, i: number, g: number, n: number, cod: string): number =>{
    if (g != i){
        if (cod === "1"){
            return a * ((Math.pow(1 + g, n) - Math.pow(1 + i, n)) / (g - 1));
        }else{
            return a * ((Math.pow(1 + i, n) - Math.pow(1 - g, n)) / (g + 1));
        }
    }else{
        if (cod === "1"){
            return a / Math.pow(1 + i, -n + 1);
        }else{
            return a * Math.pow(1 + i, n);
        }
    }    
}
