export function InteresCompuestoADecimal(interes: number): number {
  return interes / 100;
}

export function ConvertirCapitalización(tiempo: number, capitalizacion_interes: number): number {
  switch (capitalizacion_interes) {
    case 1: //Diario
      return tiempo / 30;  
    case 2: //Mensual
        return tiempo * 12;
    case 3: //Trimestral
      return tiempo * 3;
    case 4: //Cuatrimestral
      return tiempo * 4;
    case 5: //Semestral
      return tiempo * 6;
    case 6: //Anual
        return tiempo
    default:
      return tiempo; // Si la unidad no es reconocida, devolver la cantidad original
  }
}

export function ConvertirADias(capitalización_tiempo:number,tiempo: number): number {
  switch (capitalización_tiempo) {
    case 1: //Diario
      return tiempo;  
    case 2: //Mensual
        return tiempo * 30;
    case 3: //Trimestral
      return tiempo * 3 * 30;
    case 4: //Cuatrimestral
      return tiempo * 4 * 30;
    case 5: //Semestral
      return tiempo * 6 * 30;
    case 6: //Anual
        return tiempo * 365
    default:
      return tiempo; // Si la unidad no es reconocida, devolver la cantidad original
  }
}

export function ConvertirAMes(capitalización_tiempo:number,tiempo: number): number {
  switch (capitalización_tiempo) {
    case 1: //Diario
      return tiempo / 30;  
    case 2: //Mensual
        return tiempo / 12;
    case 3: //Trimestral
      return tiempo / 3;
    case 4: //Cuatrimestral
      return tiempo / 4;
    case 5: //Semestral
      return tiempo / 6;
    case 6: //Anual
        return tiempo / 12
    default:
      return tiempo; // Si la unidad no es reconocida, devolver la cantidad original
  }
}

export function ConvertirATrimestre(capitalización_tiempo:number,tiempo: number): number {
  switch (capitalización_tiempo) {
    case 1: //Diario
      return tiempo / (3 * 30);  
    case 2: //Mensual
        return tiempo / 3;
    case 3: //Trimestral
      return tiempo ;
    case 4: //Cuatrimestral
      return tiempo / 4;
    case 5: //Semestral
      return tiempo / 2;
    case 6: //Anual
        return tiempo / 4
    default:
      return tiempo; // Si la unidad no es reconocida, devolver la cantidad original
  }
}

export function ConvertirACuatrimestre(capitalización_tiempo:number,tiempo: number): number {
  switch (capitalización_tiempo) {
    case 1: //Diario
      return tiempo / (4 * 30);  
    case 2: //Mensual
        return tiempo / 4;
    case 3: //Trimestral
      return tiempo / (3/4) ;
    case 4: //Cuatrimestral
      return tiempo;
    case 5: //Semestral
      return tiempo / (3/2);
    case 6: //Anual
        return tiempo / 2 / (3/2)
    default:
      return tiempo; // Si la unidad no es reconocida, devolver la cantidad original
  }
}

export function ConvertirASemestre(capitalización_tiempo:number,tiempo: number): number {
  switch (capitalización_tiempo) {
    case 1: //Diario
        let diasPorSemestre = 6 * 30; // Asumiendo un promedio de 30 días por mes
        let semestres = tiempo / diasPorSemestre;
        return semestres
    case 2: //Mensual
        return tiempo / 6;
    case 3: //Trimestral
      return tiempo / 2 ;
    case 4: //Cuatrimestral
      return tiempo / (2/3);
    case 5: //Semestral
      return tiempo;
    case 6: //Anual
        return tiempo / 2
    default:
      return tiempo; // Si la unidad no es reconocida, devolver la cantidad original
  }
}

export function ConvertirAAño(capitalización_tiempo:number, tiempo: number): number {
  switch (capitalización_tiempo) {
    case 1: //Diario
        let diasEnUnAño = 365;
        let años = tiempo / diasEnUnAño;
        return años;
    case 2: //Mensual
        return tiempo / 12;
    case 3: //Trimestral
      return tiempo / 4 ;
    case 4: //Cuatrimestral
      return tiempo / 3;
    case 5: //Semestral
      return tiempo / 2;
    case 6: //Anual
        return tiempo
    default:
      return tiempo; // Si la unidad no es reconocida, devolver la cantidad original
  }
}

export function ConversiónCapitalizable2(capitalización_interes:number, capitalización_tiempo: number, tiempo:number ) {
  if (capitalización_interes === capitalización_tiempo){
    return tiempo
  }else{
    if (capitalización_interes === 1){
      return ConvertirADias(capitalización_tiempo, tiempo)
    }else if (capitalización_interes === 2){
      return ConvertirAMes(capitalización_tiempo, tiempo)
    }else if (capitalización_interes === 3){
      return ConvertirATrimestre(capitalización_tiempo, tiempo)
    }else if (capitalización_interes === 4){
      return ConvertirACuatrimestre(capitalización_tiempo, tiempo)
    }else if (capitalización_interes === 5){
      return ConvertirASemestre(capitalización_tiempo, tiempo)
    }else if (capitalización_interes === 6){
      return ConvertirAAño(capitalización_tiempo, tiempo)
    }
  }
}

