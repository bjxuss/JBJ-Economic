import CardsForm from "../../components/Global/CardsForm";
import Form from "./Form";

export default function InteresCompuesto() {
  return (
    <>
      <div className="flex justify-center items-center text-2xl text-slate-200">
        InteresCompuesto
      </div>
      <CardsForm Component={Form}/>
    </>
  );
}
