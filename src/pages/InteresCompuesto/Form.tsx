import { useEffect, useState } from "react";
import { ConversiónCapitalizable, InteresCompuestoADecimal } from "./converter";
import {
  CalcularCapitalCompuesto,
  CalculatInteresCompuesto,
  CalculateN,
  MontoCompuesto,
} from "./formulas";
import { ConversiónCapitalizable2 } from "./converter copy";

export default function Form() {
  const [result, setResult] = useState(0);
  const [selectedInteresOption, setSelectedInteresOption] = useState("1");
  const [selectedTiempoOption, setSelectedTiempoOption] = useState("1");
  const [selectedCapitalizableOption, setSelectedCapitalizableOption] =
    useState("1");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {}, [result]); // Ejecutar el efecto cada vez que result cambie

  const calculateResult = (event: React.FormEvent) => {
    event.preventDefault();

    const montoCompuestoInput = (
      document.getElementById("montocompuesto") as HTMLInputElement
    ).value;
    const capitalInput = (
      document.getElementById("capital") as HTMLInputElement
    ).value;
    const tasaInteresInput = (
      document.getElementById("tasainteres") as HTMLInputElement
    ).value;
    const tiempoInput = (document.getElementById("mes") as HTMLInputElement)
      .value;

    // Parsear los valores
    const mc = parseInt(montoCompuestoInput);
    const capital = parseFloat(capitalInput);
    const tasaInteres = parseFloat(tasaInteresInput);
    const tiempo = parseInt(tiempoInput, 10);

    // Convierte la tasa de interés a decimal
    const tasaDecimal = InteresCompuestoADecimal(tasaInteres);

    console.log(`Capital: ${capital}`);
    console.log(`Tasa de Interés: ${tasaInteres}%`);
    console.log(`Tasa de Interés en decimal: ${tasaDecimal}`);
    console.log(`Periodo del interés: ${selectedInteresOption}`);
    console.log(`Tiempo: ${tiempo}`);
    console.log(`Periodo del Tiempo: ${selectedTiempoOption}`);
    console.log(`Capitalizables: ${selectedCapitalizableOption}`);

    // Calcula el monto compuesto utilizando la fórmula
    if (montoCompuestoInput === "") {
      if (isChecked) {
        const cap2: number = ConversiónCapitalizable2(
          parseFloat(selectedCapitalizableOption),
          parseFloat(selectedInteresOption),
          tasaInteres
        ) as number;
        console.log(`Interés capitalizable: ${cap2}%`);
        let icc_to_decimal = InteresCompuestoADecimal(cap2);
        console.log(icc_to_decimal);

        const cap: number = ConversiónCapitalizable(
          parseFloat(selectedCapitalizableOption),
          parseFloat(selectedTiempoOption),
          tiempo
        ) as number;
        console.log(`Tiempo convertido al periodo del interés: ${cap}`);
        const resultMonto = MontoCompuesto(capital, icc_to_decimal, cap);
        setResult(resultMonto);

        const montocompuestoResult = document.getElementById(
          "montocompuesto"
        ) as HTMLInputElement;
        montocompuestoResult.value = resultMonto.toFixed(0);
      } else {
        const cap: number = ConversiónCapitalizable(
          parseFloat(selectedInteresOption),
          parseFloat(selectedTiempoOption),
          tiempo
        ) as number;
        console.log(`Tiempo convertido al periodo del interés: ${cap}`);
        const resultMonto = MontoCompuesto(capital, tasaDecimal, cap);
        setResult(resultMonto);

        const montocompuestoResult = document.getElementById(
          "montocompuesto"
        ) as HTMLInputElement;
        montocompuestoResult.value = resultMonto.toFixed(0);
      }
      //Calcular tiempo
    } else if (tiempoInput === "") {
      setResult(CalculateN(mc, capital, tasaDecimal));
      const tiempoResult = document.getElementById("mes") as HTMLInputElement;
      tiempoResult.value = result.toString();
      //Calcular Interés
    } else if (tasaInteresInput === "") {
      setResult(CalculatInteresCompuesto(mc, capital, tiempo));
      const interesCompuestoResult = document.getElementById(
        "tasainteres"
      ) as HTMLInputElement;
      interesCompuestoResult.value = result.toString();

      //Calcular Capital
    } else if (capitalInput === "") {

      if (isChecked){
        const cap2: number = ConversiónCapitalizable2(
          parseFloat(selectedCapitalizableOption),
          parseFloat(selectedInteresOption),
          tasaInteres
        ) as number;
        console.log(`Interés capitalizable: ${cap2}%`);
        let icc_to_decimal = InteresCompuestoADecimal(cap2);
        console.log(icc_to_decimal);

        const tiempo_cap: number = ConversiónCapitalizable(
          parseFloat(selectedCapitalizableOption),
          parseFloat(selectedTiempoOption),
          tiempo
        ) as number;
        console.log(`Tiempo convertido al periodo del interés: ${tiempo_cap}`);
  
        setResult(CalcularCapitalCompuesto(mc, icc_to_decimal, tiempo_cap));
        const capitalResult = document.getElementById(
          "capital"
        ) as HTMLInputElement;
        capitalResult.value = result.toFixed(0)
      }else{
        const tiempo_cap: number = ConversiónCapitalizable(
          parseFloat(selectedInteresOption),
          parseFloat(selectedTiempoOption),
          tiempo
        ) as number;
        console.log(`Tiempo convertido al periodo del interés: ${tiempo_cap}`);
  
        setResult(CalcularCapitalCompuesto(mc, tasaDecimal, tiempo_cap));
        const capitalResult = document.getElementById(
          "capital"
        ) as HTMLInputElement;
        capitalResult.value = result.toFixed(0)
      }

      
    }
    console.log(result);
  };

  const preventCopyPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = event.charCode;
    const char = String.fromCharCode(charCode);

    // Solo permitir números y el punto
    if (!/^\d*\.?\d*$/.test(char)) {
      event.preventDefault();
    }
  };

  const handleInteresOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedInteresOption(event.target.value); // Actualizar el estado con la opción seleccionada
  };

  const handleTiempoOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTiempoOption(event.target.value); // Actualizar el estado con la opción seleccionada
  };

  const handleCapitalizableOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCapitalizableOption(event.target.value); // Actualizar el estado con la opción seleccionada
  };

  const handleIsChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <form
      className="flex flex-col gap-2 [&>input]:rounded-md [&>input]:p-2
      [&>div]:flex [&>div]:justify-between [&>div]:item-center [&>div]:gap-4 
      [&>div>input]:rounded-md [&>div>input]:p-2 border-l-lime-400"
      onSubmit={calculateResult}
    >
      <div>
        <label htmlFor="Hola" className="text-xl text-black font-semibold">
          Monto compuesto
        </label>
        <input
          type="text"
          id="montocompuesto"
          placeholder="Ejemplo: 245030"
          className="rounded-md p-2"
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div>
        <label className="text-xl text-black font-semibold">Capital</label>
        <input
          type="text"
          id="capital"
          placeholder="Ejemplo: 250000"
          className="rounded-md p-2"
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div>
        <label htmlFor="Hola" className="text-xl text-black font-semibold">
          Interés (%)
        </label>
        <div className="flex gap-2 [&>input]:rounded-md [&>input]:p-2">
          <input
            type="text"
            id="tasainteres"
            placeholder="Ej: 2"
            onCopy={preventCopyPaste}
            onPaste={preventCopyPaste}
            onKeyPress={handleKeyPress}
            className="w-24 h-10 rounded-md p-1"
          />
          <select
            id="modo"
            name="modo"
            onChange={handleInteresOptionChange}
            value={selectedInteresOption}
            className="w-22 h-10 rounded-md p-1"
          >
            <option value="1">Diario</option>
            <option value="2">Mensual</option>
            <option value="3">Trimestral</option>
            <option value="4">Cuatrimestral</option>
            <option value="5">Semestral</option>
            <option value="6">Anual</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="Hola" className="text-xl text-black font-semibold">
          Tiempo
        </label>
        <div className="flex gap-2 [&>input]:rounded-md [&>input]:p-2">
          <input
            type="text"
            id="mes"
            placeholder="Ej: 8"
            onCopy={preventCopyPaste}
            onPaste={preventCopyPaste}
            onKeyPress={handleKeyPress}
            className="w-24 h-10 rounded-md p-1"
          />
          <select
            id="modo"
            name="modo"
            onChange={handleTiempoOptionChange}
            value={selectedTiempoOption}
            className="w-22 h-10 rounded-md p-1"
          >
            <option value="1">Diario</option>
            <option value="2">Mensual</option>
            <option value="3">Trimestral</option>
            <option value="4">Cuatrimestral</option>
            <option value="5">Semestral</option>
            <option value="6">Anual</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="space-x-1">
          <input
            type="checkbox"
            name="capitalizable"
            id="capitalizable"
            checked={isChecked}
            onChange={handleIsChecked}
          />
          <label htmlFor="">Capitalizable</label>
        </div>
        <select
          id="capitalizable"
          name="capitalizable"
          value={selectedCapitalizableOption}
          disabled={!isChecked}
          onChange={handleCapitalizableOptionChange}
          className="w-22 h-10 rounded-md p-1"
        >
          <option value="1">Diario</option>
          <option value="2">Mensual</option>
          <option value="3">Trimestral</option>
          <option value="4">Cuatrimestral</option>
          <option value="5">Semestral</option>
          <option value="6">Anual</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-orange-500 p-5 rounded-md cursor-pointer text-slate-100 font-semibold text-2xl
      hover:scale-105 duration-150"
      >
        Calcular
      </button>
    </form>
  );
}
