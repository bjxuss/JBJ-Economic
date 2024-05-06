import CardsForm from "../../components/Global/CardsForm";
import Title from "../../components/Global/Title";
import Form from "./Form";

export default function Gradiente() {
  return (
    <>
      <Title title="Gradiente o Series Variables" />
      <p className="text-black">
        Siguiendo el tema de Anualidades, se abre este otro tema denominado
        Gradientes, de cuya definición podemos partir: Definición: Se refiere a
        una serie abonos o pagos que aumentan o disminuyen (en $ ó %), sea para
        liquidar una deuda o en su defecto para acumular un determinado fondo de
        ahorro que puede ser a corto, mediano o largo plazo, incluso a
        perpetuidad.
        <br></br>
        <br></br>
        <strong>
          LA CLASIFICACIÓN DE ESTE TIPO DE RENTAS PERIÓDICAS VARIABLES ES:
        </strong>
        <br></br>
        <br></br>
        <ul>
          <li>
            Gradiente aritmético: La cuota periódica varía en progresión
            aritmética (A+ ga ó Rp + Ga).
          </li>
          <li>
            Gradiente geométrico: La cuota periódica varía en progresión
            geométrica (A* ga ó Rp * Gg).
          </li>
        </ul>
        Variables que se utilizan en este apartado:
        <br></br>
        <br></br>
        <ul>
          <li>
            <strong>VF:</strong> Valor Futuro o Monto de una serie de cuotas con
            gradiente: aritmético o geométrico (de la suma de unos pagos o
            abonos)
            <strong>VP:</strong> Valor Presente o Monto de una serie de cuotas
            con gradiente: aritmético o geométrico (de la suma de unos pagos o
            abonos)
          </li>
          <li>
            <strong>Gradiente (g):</strong> Anualidad o Renta periódica (cuota
            uniforme o anualidad)
          </li>
          <li>
            <strong>Va:</strong> Valor actual del conjunto de rentas periódicas
          </li>
          <li>
            <strong>i(%):</strong> Tasa de Interés nominal
          </li>
          <li>
            <strong>Capitalización:</strong> (por su tipo, mensual, bimestral
            etc., la tasa se divide: ejemplo de ello si tenemos una tasa nominal
            del 12% capitalizable mensualmente = (12%/12))
          </li>
          <li>
            <strong># cuotas:</strong> Tiempo
          </li>
          <li>
            <strong>Ga=</strong> Es el gradiente aritmético
          </li>
          <li>
            <strong>Gg=</strong> Es el gradiente geométrico
          </li>
        </ul>
      </p>
      <div className="flex justify-center items-center pt-10">
        <img src="/formula-gradiente.webp" alt="Fórmula Gradiente" />
      </div>
      <CardsForm Component={Form} />{" "}
    </>
  );
}
