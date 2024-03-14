import AnualidadesdesForm from "../components/03_Anualidad/Form-A"
import CardsForm from "../components/Global/CardsForm"


const Anualidades = () => {
  return (
    <>
      <div className="flex justify-center items-center text-7xl text-black font-medium pt-10 border-[#967460] ">
        Anualidades
      </div>
      <CardsForm Component={AnualidadesdesForm} />
    </>
    
  )
}
export default Anualidades
