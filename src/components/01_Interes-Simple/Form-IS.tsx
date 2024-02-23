//hooks react
import { ChangeEvent, useState } from "react";
import { Interes_Simple } from "./Valor_Futuro";


interface Interes {
    capital: number,
    interes: number,
    tiempo: number,
}



const Form = () => {

    //estado de la interface
    const [state, setState] = useState<Interes>({
        capital: 0,
        interes: 0,
        tiempo: 0,
    })

    //Estado del resultado
    const [result, setResult] = useState<number>(0)


    // Metodo para obtener el valor del input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

        const { name, value } = event.target;

         setState(prevState => ({
        ...prevState,
        [name]: parseFloat(value),
        }));
  
      }

     
      
  // Funcion para enviar los datos
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state.capital + " - " + state.interes + " - " + state.tiempo);
    const response = Interes_Simple(state.capital,state.interes,state.tiempo)
    console.log(response);
    
    setResult(response)
  }
  return (
    <section>
        <div>
            <form action="" onSubmit={onSubmit} className="">

                <label htmlFor="">Monto final</label>
                <input type="number" name="monto" id="" 
                        />

                <label htmlFor="">Capital</label>
                <input type="number" name="capital" id="" 
                       onChange={handleInputChange}
                       value={state.capital} />

                <label htmlFor="">Interes</label>
                <input type="number" name="interes" id=""
                        onChange={handleInputChange} 
                        value={state.interes} />


                <label htmlFor="">Año</label>
                <input type="number" name="tiempo" onChange={handleInputChange} value={state.tiempo} />

                <h1>Interes: <span>{result}</span></h1>

                <button type="submit">Enviar</button>


                {/* 
                <label htmlFor="">Tiempo</label>
                 */}
                {/* <select name="tiempo" id="">
                    <option value="Año">Años</option>
                    <option value="" >Intervalo</option>
                    
                </select> */}

            </form>
        </div>
   </section>
  )
}

export default Form