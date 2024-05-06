import AnualidadesdesForm from "../components/03_Anualidad/Form-A";
import CardsForm from "../components/Global/CardsForm";
//import capitalizacionImage from "../assets/capitalizacion_formula.png"; // Importa la imagen de la fórmula de la capitalización
//<img src={capitalizacionImage} alt="Fórmula de Capitalización" className="max-w-lg" />
      
const Anualidades = () => {
  return (
    <>
      <div className="flex justify-center items-center text-7xl text-black font-medium pt-10 border-[#967460] ">
        Anualidades
      </div>
      <CardsForm Component={AnualidadesdesForm} />
    </>
  );
};

export default Anualidades;
