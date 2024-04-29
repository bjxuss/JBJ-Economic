import CardsForm from "../components/Global/CardsForm"
import AmortizacionForm from "../components/04_amortizacion/Form_Am"

const Amortizacion = () => {
    return (
      <>
        <div className="flex justify-center items-center text-7xl text-black font-medium pt-10 border-[#967460] ">
          Amortizacion
        </div>
        <CardsForm Component={AmortizacionForm} />
      </>
      
    )
  }
  export default Amortizacion
  