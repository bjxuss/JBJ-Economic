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
    VAN: number,

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


    return (
        <form className="w-[900px] h-[500px] p-5 bg-[#fff] rounded-[10px] shadow-[0_2px_4px_#1e1b4b] flex flex-row">




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



        </form>
    )
}

export default Form