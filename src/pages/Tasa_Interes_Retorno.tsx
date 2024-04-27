import Form from "../components/06_Tasa-Interes-Retorno/Form-TIR"
import CardsForm from "../components/Global/CardsForm"

const Tasa_Interes_Retorno = () => {
  return (
    <>
      <div className="flex justify-center items-center text-7xl text-black font-medium pt-10 border-[#967460] ">
        Interes Simple
      </div>
      <CardsForm Component={Form} />
    </>
  )
}

export default Tasa_Interes_Retorno