import { useNavigate } from "react-router-dom";

const ButtonList = [
  { name: "Interés Simple", url: "/is" },
  { name: "Interés Compuesto", url: "/ic" },
  { name: "Anualidad", url: "/an" },
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
          <button onClick={() => handleClick(button.url)} key={index}>
            {button.name}
          </button>
        );
      })}
    </>
  );
}
