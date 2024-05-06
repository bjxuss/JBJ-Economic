import { ChangeEvent, useState } from "react"
import Card_initial from "./Card-initial"
import Modal_project from "./Modal-Project"
import CardProject from "./CardProject"
// import InputControl from "../Global/InputControl"
// import CardsForm from "../Global/CardsForm"



interface Project {
    name: string,
    interes: number,
    ingresos: Ingresos,
    TIR: number,

}

interface Ingresos {
    valor: number,
    periodo: number,
}

interface Modal {
    open: boolean,
    close: boolean
}

const Form = () => {

    const [numProjects, setnumProjects] = useState<number>(0)

    const [modal, setModal] = useState<Modal>({
        open: false,
        close: true
    })

    const [Project, setProject] = useState<Project[]>([])

    const [compare, setcompare] = useState("")

    const agregarProyecto = (project: Project) => {
        setProject([
            ...Project,
            project
        ])
    }




    const modalOpen = () => {
        setModal(prevModal => ({
            ...prevModal,
            open: true,
            close: false
        }));

        console.log(modal); // Esto imprimirá el estado actualizado
    }


    const modalClose = () => {
        setModal(prevState => ({
            ...prevState,
            open: false,
            close: true
        }));
        console.log(modal);

    }



    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        if (!isNaN(parseFloat(value))) {
            setnumProjects(
                parseFloat(value)
            );

        }
        console.log(numProjects);


    }

    const resetComponents = () => {
        setProject([])
        setcompare("")
    }

    const compareProjects = () => {
        if (Project.length < 2) {
            const rp: string = "Se necesitan al menos dos proyectos para comparar."
            console.log(rp);
            setcompare(rp)
            return;
        }
    
        let maxTIR = Number.NEGATIVE_INFINITY;
        let maxTIRProjects: number[] = [];
    
        Project.forEach((project, index) => {
            const projectTIR: number = project.TIR;
            if (projectTIR > maxTIR) {
                maxTIR = projectTIR;
                maxTIRProjects = [index];
            } else if (projectTIR === maxTIR) {
                maxTIRProjects.push(index);
            }
        });
    
        if (maxTIRProjects.length === 1) {

            const resultCompare: string = `El proyecto más rentable es "${Project[maxTIRProjects[0]].name}" con una TIR de ${maxTIR}%.`;
            console.log(resultCompare);
            setcompare(resultCompare)
            

        } else {
            console.log(`Los proyectos más rentables con una TIR de ${maxTIR}% son:`);
            maxTIRProjects.forEach(index => {
                console.log(`- "${Project[index].name}"`);
            });
            setcompare("Inversion indiferente, es decir, queda a su criterio escoger en que proyecto invertir")
        }
    }
    

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    }




    return (
        <>
            <form className="w-[900px] h-[500px] p-5 bg-[#fff] rounded-[10px] shadow-[0_2px_4px_#1e1b4b] flex flex-row" onSubmit={onSubmit}>




                {Project.map((project, index) => (
                    <CardProject key={index} {...project} />
                ))}
                <Card_initial onClick={modalOpen} />


                {modal.open && (
                    <Modal_project onClose={modalClose}
                        open={modal.open}
                        animationOpen=""
                        handleInputChange={handleInputChange}
                        addProject={agregarProyecto} />
                )}

                <div className="flex flex-col ml-4 space-y-4">

                    <button
                        type="submit"
                        className="bg-orange-500 p-5 rounded-md cursor-pointer text-slate-100 font-semibold text-2xl
    hover:scale-105 duration-150"
                    onClick={compareProjects}
                    >
                        Comparar
                    </button>

                    <button onClick={resetComponents} className="bg-red-600 p-5 rounded-md cursor-pointer text-slate-100 font-semibold text-2xl
    hover:scale-105 duration-150">Limpiar</button>
                </div>






            </form>

            <h3>{compare}</h3>

        </>

    )
}

export default Form