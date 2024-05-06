import Form from "../components/06_Tasa-Interes-Retorno/Form-TIR"
import tir from "../assets/tir.png"

const Tasa_Interes_Retorno = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen pt-80">
      <div className="text-7xl text-black font-medium pt-10 border-[#967460] ">
        Tasa de Interes de Retorno
      </div>
      <div className="flex flex-col items-center pt-10">
        <div className="text-lg text-gray-700 max-w-xl text-center pb-3">
        Es uno de los métodos de evaluación de proyectos de inversión más recomendables. 
        Se utiliza frecuentemente para analizar la viabilidad de un proyecto y determinar la tasa de beneficio o rentabilidad que se puede obtener de dicha inversión.
        

        <img src={tir} alt="" />

        Estrechamente ligado al VAN, el TIR también es definido como el valor de la tasa de descuento que iguala el VAN a cero, para un determinado proyecto de inversión. 
        Su resultado viene expresado en valor porcentual.

        </div>

        

        
      </div>
      <Form />
    </div>
  )
}

export default Tasa_Interes_Retorno