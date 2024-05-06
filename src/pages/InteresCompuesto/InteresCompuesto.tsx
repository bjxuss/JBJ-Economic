import CardsForm from "../../components/Global/CardsForm";
import Title from "../../components/Global/Title";
import Form from "./Form";

export default function InteresCompuesto() {
  return (
    <>
      <Title title="Interés Compuesto" />
      <p className="text-black">
        El interés compuesto representa la acumulación de intereses que se han
        generado en un período determinado por un capital inicial o principal a
        una tasa de interés durante varios periodos de imposición, de modo que
        los intereses que se obtienen al final de cada período de inversión no
        se retiran sino que se reinvierten o añaden al capital inicial, es
        decir, se capitalizan. Es aquel interés que se cobra por un crédito y al
        ser liquidado se acumula al capital (capitalización del interés), por lo
        que en la siguiente liquidación de intereses, el interés anterior forma
        parte del capital o base del cálculo del nuevo interés.
      </p>
      <br />

      <ul>
        <li>
          <strong>Monto Compuesto</strong> es el resultado de aplicar interés compuesto a un
          capital inicial durante un período de tiempo específico.
        </li>
        <li>
          <strong>Capital inicial o principal:</strong> este será el capital que
          presta inicialmente la entidad bancaria. Los representamos con las
          siglas Ci.
        </li>
        <li>
          <strong>Tasa de interés:</strong> un interés es la ganancia que se
          saca a algo. En este contexto lo representamos con la letra r y
          también se le suele llamar rédito.
        </li>
        <li>
          <strong>Tiempo (n):</strong> el periodo de imposición es el tiempo que
          tenemos para devolver el dinero del préstamo. El número que lo
          representa dependerá de cuándo tengamos que devolver el dinero. Se
          trata de un número entero y lo representamos con la letra n.
          Normalmente esta n serán años pero hay algunas excepciones.
        </li>
      </ul>
      <div className="flex justify-center items-center pt-10">
        <img src="/formula-interes-compuesto.webp" alt="Fórmula Gradiente" />
      </div>

      <CardsForm Component={Form} />
    </>
  );
}
