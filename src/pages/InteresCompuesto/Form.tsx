import { useState } from "react";

export default function Form() {
  const [result, setResult] = useState(Number);

  const calculateResult = (event: React.FormEvent) => {
    event.preventDefault();
    // const montoCompuesto = parseFloat((document.getElementById('montocompuesto') as HTMLInputElement).value);
    const capital = parseFloat(
      (document.getElementById("capital") as HTMLInputElement).value
    );
    const tasaInteres = parseFloat(
      (document.getElementById("tasainteres") as HTMLInputElement).value
    );
    // const anio = parseInt((document.getElementById('anio') as HTMLInputElement).value, 10);
    const mes = parseInt(
      (document.getElementById("mes") as HTMLInputElement).value,
      10
    );
    // const dia = parseInt((document.getElementById('dia') as HTMLInputElement).value, 10);

    // Convierte la tasa de interés a decimal
    const tasaDecimal = tasaInteres / 100;

    // Calcula el monto compuesto utilizando la fórmula
    setResult(capital * Math.pow(1 + tasaDecimal, mes));
    console.log(result);
    

    
  };

  return (
    <form
      className="flex flex-col gap-2 [&>input]:rounded-md"
      onSubmit={calculateResult}
    >
      <input
        type="text"
        name="montocompuesto"
        id="montocompuesto"
        placeholder="Monto Compuesto"
      />
      <input type="text" name="capital" id="capital" placeholder="Capital" />
      <input
        type="text"
        name="tasainteres"
        id="tasainteres"
        placeholder="Tasa de Interés"
      />
      <input type="text" name="anio" id="anio" placeholder="Año" />
      <input type="text" name="mes" id="mes" placeholder="Mes" />
      <input type="text" name="dia" id="dia" placeholder="Dia" />
      <button type="submit">Calcular</button>
    </form>
    
    

  );
}
