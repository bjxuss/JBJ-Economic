import { useState } from "react"
import InputControl from "../Global/InputControl"
import "./styles/modal-animated-backdrop.css"
import { calcularTIR, calcularVAN } from "./Formulas"
import { MathJaxFormula, MathJaxProvider } from "mathjax3-react"


interface Project {
  name: string,
  interes: number,
  inversion: number,
  ingresos: Ingresos,
  TIR: number,
  VAN: number,
}

interface Ingresos {
  periodo: number,
  valor: number,
}

interface Props {
  animationOpen: string,
  open: boolean,
  onClose: React.MouseEventHandler<HTMLButtonElement>,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  addProject: (project: Project) => void
}




const Modal_project: React.FC<Props> = (props) => {

  const [incomes, setIncomes] = useState<Ingresos[]>([{ periodo: 1, valor: 0 }]);



  const addIncomes = (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(index);

    setIncomes([...incomes, { periodo: index + 1, valor: 0 }]);
  };

  const removeIncome = () => {
    setIncomes(prevIncomes => prevIncomes.slice(0, 1));
  };



  const handleYear = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, index, value);
  }
  const handleIncomes = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, index);

    const newIncomes: { periodo: number; valor: number }[] = [...incomes];

    newIncomes[index] = {
      ...newIncomes[index],
      [name]: parseFloat(value)
    };
    setIncomes(newIncomes);

    console.log(newIncomes);


  };

  const [Project, setProject] = useState<Project>({
    name: "",
    interes: 0,
    inversion: 0,
    ingresos: {
      valor: 0,
      periodo: 0
    },
    TIR: 0,
    VAN: 0
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    console.log(name + value);

    // const [fieldName, nestedFieldName] = name.split('.'); // Separar el nombre del campo y el nombre del campo anidado

    setProject(prevState => ({
      ...prevState,
      [name]: parseFloat(value)
    }));
  }

  const handleInputText = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    console.log(name + value);

    // const [fieldName, nestedFieldName] = name.split('.'); // Separar el nombre del campo y el nombre del campo anidado

    setProject(prevState => ({
      ...prevState,
      [name]: value
    }));
  }




  // Mostrar la ecuación de la TIR con valores reemplazados

  let flujosCaja: number[] = []

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Obtener la inversión del estado Project
    const inversion = Project.inversion * -1;

    // Obtener los ingresos del estado incomes
    const ingresos = incomes.map(income => income.valor);

    // Generar la matriz de flujos de caja
    flujosCaja = [inversion, ...ingresos];

    const tasaEstimada = Project.interes / 100

    // Imprimir la matriz de flujos de caja
    console.log(flujosCaja);

    console.log(Project.interes);


    const tir: number = calcularTIR(flujosCaja, tasaEstimada);

    const van: number = calcularVAN(flujosCaja, inversion, tasaEstimada)


    setProject(prevState => ({
      ...prevState,
      TIR: tir,
      VAN: van
    }));



  }

  const createProject = (e: React.FormEvent<HTMLButtonElement>) => {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();

    props.addProject(Project); // Envía el proyecto al componente padre


  }


  // Mostrar la ecuación de la TIR con valores reemplazados
  const ecuacionTIR = `$$
  0 = -inversion *  \\sum_{i=0}^{n} \\frac{CF_i}{(1 + r)^i}
  $$`;


  const ecuacionSoluciones = `
\\( inversion = ${Project.inversion} \\)
\\( ingresos = ${incomes.map((ingreso) => ingreso.valor).join(", ")} \\)
\\( TIR = ${Project.TIR.toFixed(2)}  \\) %
\\( VAN = $  ${Project.VAN.toFixed(2)}  \\) `;




  return (


    <div className="modal is-open">
      {/* {props.open && (document.body.style.overflow = "hidden")} */}


      <div className="modal-container">
        <div className="modal-left">
          <h1 className="modal-title">Welcome!</h1>

          <InputControl divName="input-block"
            labelName="Nombre de la empresa: "
            inputName="name"
            value={Project.name}
            type="text"
            handleInputChange={(e) => handleInputText(e)}
            className="input-block input"
            style="input-label"

          />

          <InputControl divName="input-block"
            labelName="Inversion ($): "
            inputName="inversion"
            value={Project.inversion}
            type="number"
            handleInputChange={handleInputChange}
            className="input-block input"
            style="input-label"

          />



          <InputControl divName="input-block"
            labelName="Tasa de Interes(%): "
            inputName="interes"
            value={Project.interes}
            type="number"
            handleInputChange={handleInputChange}
            className="input-block input"
            style="input-label"
            required={true}

          />

          <div>
            {incomes.map((income, index) => (
              <div className="flex [&>div]:mr-2 [&>div]:w-1/3" key={index}>

                <InputControl divName="input-block"
                  labelName={`Año ${index + 1}: `}
                  inputName="periodo"
                  value={index + 1}
                  type="number"
                  handleInputChange={(e) => handleYear(index, e)}
                  className="input-block input"
                  style="input-label"
                  disabled={true}
                  required={true}

                />

                <InputControl divName="input-block"
                  labelName="Ingreso ($): "
                  inputName="valor"
                  value={income.valor}
                  type="number"
                  handleInputChange={(e) => handleIncomes(index, e)}
                  className="input-block input"
                  style="input-label"
                  required={true}
                />

                <div className="flex space-x-1 ">
                  {/* Botón para eliminar */}
                  <button onClick={() => removeIncome()} className="text-white bg-red-500 rounded-sm flex-grow flex-shrink mb-[5px]">
                    X
                  </button>

                  <button onClick={(e) => addIncomes(index, e)} className="text-white bg-green-500 rounded-sm flex-grow flex-shrink mb-[5px]">+</button>

                </div>



              </div>


            ))}

          </div>



          <div className="modal-buttons">
            <button className="input-button" onClick={handleSubmit}>Calcular TIR</button>
          </div>
        </div>
        <div className="modal-right">
          <div className="content">


            <h1>{Project.TIR}</h1>
            <br />

            <p className="font-medium text-black">
              <strong className="text-black items-center"> ¿Que es?</strong><br />
              La tasa interna de retorno (TIR) mide la rentabilidad de una inversión. Es decir, cuánto ganas o pierdes, expresado en porcentaje.
            </p>

            <MathJaxProvider>
              <MathJaxFormula formula={ecuacionTIR} />
            </MathJaxProvider>


            <MathJaxProvider>
              <MathJaxFormula formula={ecuacionSoluciones} />
            </MathJaxProvider>


            <p className="text-black">
              El proyecto o inversión:
              {/* <strong className={Project.TIR > Project.interes ? 'bg-green-500' : 'bg-red-500'}>
                    {Project.TIR > Project.interes ? " es rentable" : " no es rentable"}
                    
                  </strong> */}

              <strong className={(Project.TIR > Project.interes) && (Project.VAN > 0) ? 'bg-green-500' : 'bg-red-500'}>
              {(Project.TIR > Project.interes) && (Project.VAN > 0 ) ? " es rentable" : " no es rentable"}

              </strong>
            </p>



            <div className="modal-buttons">
              <button className="input-button" onClick={createProject}>Guardar</button>
            </div>
          </div>

        </div>
        <button className="icon-button close-button" onClick={props.onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
          </svg>
        </button>
      </div>
    </div>



  );
}


export default Modal_project;