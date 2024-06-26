import { useNavigate } from "react-router-dom";

const ButtonList = [
  { name: "Interés Simple", url: "/is" },
  { name: "Interés Compuesto", url: "/ic" },
  { name: "Anualidad", url: "/an" },
  { name: "Gradiente", url: "gr"},
  { name: "Amortización", url: "/am"},
  { name: "Capitalizacion", url: "/cap"},
  { name: "Tasa Interes de Retorno", url: "/tir" }
];

export default function ButtonHome() {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(url);
  };
  return (
    <>
      {ButtonList.map((button, index) => {
        return (
          <button className="text-black text-2xl mr-4 p-4 bg-slate-300 rounded-lg 
                            hover:scale-105 hover:bg-slate-400 duration-200" 
          onClick={() => handleClick(button.url)} key={index}>
            {button.name}
          </button>
        );
      })}
    </>
  );
}
