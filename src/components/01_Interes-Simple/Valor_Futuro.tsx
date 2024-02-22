// import { useState } from "react";

const Valor_Futuro = () => {

    // const [state, setstate] = useState(0)
  return (
   <section>
        <div>
            <form action="">
                <label htmlFor="">Capital</label>
                <input type="number" name="capital" id="" />

                <label htmlFor="">Interes</label>
                <input type="number" name="interes" id="" />

                <label htmlFor="">Tiempo</label>
                
                <select name="tiempo" id="">
                    <option value="Año">Años</option>
                    <option value="">Intervalo</option>
                    
                </select>
                {/* {calcular_Monto_Final(state,state,state)} */}
            </form>
        </div>
   </section>
  )
}

// function calcular_Monto_Final(capital:number,interes:number, tiempo:number ) {
//     const interes_decimal:number = interes / 100
//     return {interes_decimal, tiempo};

// }

export default Valor_Futuro