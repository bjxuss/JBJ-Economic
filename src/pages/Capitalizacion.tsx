import CardsForm from "../components/Global/CardsForm";
import CapitalizacionForm from "../components/05_capitalizacion/Form_Cap";
import cap from "../../src/assets/WhatsApp Image 2024-05-06 at 7.26.37 AM.jpeg"
const Capitalizacion = () => {
  return (
    <>
      <div className="flex justify-center items-center text-7xl text-black font-medium pt-10 border-[#967460]">
        Capitalización
      </div>
      <div className="flex flex-col items-center pt-10">
        <div className="text-lg text-gray-700 max-w-xl text-center pb-3">
          La capitalización es el proceso mediante el cual un monto inicial de dinero crece con el tiempo debido al interés generado por ese capital. Es esencialmente la acumulación de intereses sobre el capital original, lo que resulta en un capital final mayor.
        <img src={cap} alt="capitaliazacion" />
        </div>
        
      </div>
      <CardsForm Component={CapitalizacionForm} />
    </>
  );
};

export default Capitalizacion;
