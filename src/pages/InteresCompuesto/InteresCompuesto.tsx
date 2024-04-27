import CardsForm from "../../components/Global/CardsForm";
import Title from "../../components/Global/Title";
import Form from "./Form";

export default function InteresCompuesto() {
  return (
    <>
      <Title title="Interés Compuesto"/>
      <CardsForm Component={Form}/>
    </>
  );
}
