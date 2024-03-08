import { useEffect, useState } from "react";

export default function Form() {
  const [result, setResult] = useState(0);

  useEffect(() => {
  }, [result]); // Ejecutar el efecto cada vez que result cambie


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
    const mesInput = (document.getElementById("mes") as HTMLInputElement).value;

    
    // Parsear los valores
    const capital = parseFloat(capitalInput);
    const tasaInteres = parseInt(tasaInteresInput, 10);
    const mes = parseInt(mesInput, 10);

    // Convierte la tasa de interés a decimal
    const tasaDecimal = tasaInteres / 100;

    // Calcula el monto compuesto utilizando la fórmula
    if (montoCompuestoInput === "") {
      const resultMonto = capital * Math.pow(1 + tasaDecimal, mes);
      setResult(resultMonto);
      
      const montocompuestoResult = document.getElementById("montocompuesto") as HTMLInputElement
      montocompuestoResult.value = resultMonto.toFixed(2);
    }
    console.log(result);
  };

  return (
    <form
      className="flex flex-col gap-2 [&>input]:rounded-md [&>input]:p-2"
      onSubmit={calculateResult}
    >
      <input type="text" id="montocompuesto" placeholder="Monto Compuesto" />
      <input type="text" id="capital" placeholder="Capital" />
      <input type="text" id="tasainteres" placeholder="Tasa de Interés" />
      <input type="text" id="anio" placeholder="Año" />
      <input type="text" id="mes" placeholder="Mes" />
      <input type="text" id="dia" placeholder="Dia" />
      <button type="submit">Calcular</button>
    </form>
  );
}
