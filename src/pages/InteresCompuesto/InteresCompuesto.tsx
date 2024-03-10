import CardsForm from "../../components/Global/CardsForm";
import Form from "./Form";

export default function InteresCompuesto() {
  return (
    <>
      <div className="flex justify-center items-center text-7xl text-black font-medium pt-10">
        Interes Compuesto
      </div>
      <CardsForm Component={Form}/>
    </>
  );
}
