import CardsForm from "../components/Global/CardsForm"
import NominaForm from "../components/nomina/FormNomina"


const Nomina = () => {
  return (
    <>
      <div className="flex justify-center items-center text-7xl text-black font-medium pt-10 border-[#967460] ">
        Nomina docentes.
      </div>
      <CardsForm Component={NominaForm} />
    </>
    
  )
}
export default Nomina
