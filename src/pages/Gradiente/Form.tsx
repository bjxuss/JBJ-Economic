import { useState } from "react";
import Label from "../../components/Global/Label";
import { handleKeyPress } from "../../utils/InputNumberValidator";
// import {handleNOptionChange} from "../../utils/eventHandlers"
import preventCopyPaste from "../../utils/InputPreventCopyPaste";
import Select from "../../components/Global/Select";
import {
  calcularValorFuturo,
  calcularValorPresente,
} from "./equations_aritmetic_gradient";
import { parseFormValues } from "./parse_values";
import {
  calculateFutureValue,
  calculatePresentValue,
} from "./equations_geometric_gradient";

export default function Form() {
  const [formValues, setFormValues] = useState({
    value: "",
    quota_value: "",
    g: "",
    n: "",
    interest: "",
    select_n_options: "1",
    select_interest_options: "1",
    creciente_o_decreciente: "1",
    vp_or_vf: "1",
    tipo_gradiente: "1",
  });

  // const [result, setResult] = useState<number>(0);

  // const [select_n_options, setSelect_n_options] = useState("1")

  const handleInputOrSelectChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const calculateResult = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Los campos son: ", formValues);

    const parsed_form_values = parseFormValues(formValues);

    if (formValues.value === "" && formValues.tipo_gradiente === "1") {
      if (formValues.vp_or_vf === "1") {
        const result = calcularValorPresente(
          parsed_form_values.quota_value,
          parsed_form_values.g,
          parseFloat(formValues.interest) / 100,
          parsed_form_values.n,
          formValues.creciente_o_decreciente
        );

        const value = document.getElementById("value") as HTMLInputElement;
        value.value = result.toFixed(2);

        console.log(result);
        // setResult(result);
      } else {
        const result = calcularValorFuturo(
          parsed_form_values.quota_value,
          parsed_form_values.g,
          parseFloat(formValues.interest) / 100,
          parsed_form_values.n,
          formValues.creciente_o_decreciente
        );

        const value = document.getElementById("value") as HTMLInputElement;
        value.value = result.toFixed(2);
      }
    } else {
      if (formValues.vp_or_vf === "1") {
        const result = calculatePresentValue(
          parsed_form_values.quota_value,
          parseFloat(formValues.interest) / 100,
          parseFloat(formValues.g) / 100,
          parsed_form_values.n,
          formValues.creciente_o_decreciente
        );
        const value = document.getElementById("value") as HTMLInputElement;
        value.value = result.toFixed(2);
      } else {
        const result = calculateFutureValue(
          parsed_form_values.quota_value,
          parseFloat(formValues.interest) / 100,
          parseFloat(formValues.g) / 100,
          parsed_form_values.n,
          formValues.creciente_o_decreciente
        );
        const value = document.getElementById("value") as HTMLInputElement;
        value.value = result.toFixed(2);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-2 [&>input]:rounded-md [&>input]:p-2
    [&>div]:flex [&>div]:justify-between [&>div]:item-center [&>div]:gap-4 
    [&>div>input]:rounded-md [&>div>input]:p-2 border-l-lime-400"
      onSubmit={calculateResult}
    >
      <div>
        <Label labelname="Tipo de Gradiente" />
        <select id="tipo_gradiente" onChange={handleInputOrSelectChange}
        className="w-22 h-10 rounded-md p-1">
          <option value="1">Gradiente Aritmético</option>
          <option value="2">Gradiente Geométrico</option>
        </select>
        <select
            id="creciente_o_decreciente"
            className="w-22 h-10 rounded-md p-1"
            onChange={handleInputOrSelectChange}
          >
            <option value="1">CRECIENTE</option>
            <option value="2">DECRECIENTE</option>
          </select>
      </div>
      <div>
        <Label labelname="Valor" />{" "}
        <input
          type="text"
          id="value"
          placeholder="Ejemplo: 4250042"
          className="rounded-md p-2"
          onKeyPress={handleKeyPress}
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          value={formValues.value}
          onChange={handleInputOrSelectChange}
        />
        <select id="vp_or_vf" onChange={handleInputOrSelectChange} className="w-22 h-10 rounded-md p-1">
          <option value="1">Valor Presente</option>
          <option value="2">Valor Futuro</option>
        </select>
      </div>
      <div>
        <Label labelname="Valor de la cuota" />
        <input
          type="text"
          id="quota_value"
          placeholder="Ejemplo: 20000"
          onKeyPress={handleKeyPress}
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          value={formValues.quota_value}
          onChange={handleInputOrSelectChange}
        />
      </div>
      <div>
        <Label labelname={formValues.tipo_gradiente === "1" ? "g ($)" : "g (%)"} />
        <input
          type="text"
          id="g"
          placeholder="Ejemplo: 100"
          className="rounded-md p-2"
          onKeyPress={handleKeyPress}
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          value={formValues.g}
          onChange={handleInputOrSelectChange}
        />
      </div>
      <div>
        <Label labelname="# de cuota" />
        <input
          type="text"
          id="n"
          placeholder="Ejemplo: 10"
          className="rounded-md p-2"
          onKeyPress={handleKeyPress}
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          value={formValues.n}
          onChange={handleInputOrSelectChange}
        />
        <Select
          id="select_n_options"
          handleInputChange={handleInputOrSelectChange}
          value={formValues.select_n_options}
        />
      </div>
      <div>
        <Label labelname="Interés (%)" />
        <input
          type="text"
          id="interest"
          placeholder="Ej: 2"
          className="rounded-md p-2"
          onKeyPress={handleKeyPress}
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          value={formValues.interest}
          onChange={handleInputOrSelectChange}
        />
        <Select
          id="select_interest_options"
          handleInputChange={handleInputOrSelectChange}
          value={formValues.select_interest_options}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-start gap-2">
          <input type="checkbox" id="capitalizable" />
          <label>Capitalizable</label>
        </div>
        
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
