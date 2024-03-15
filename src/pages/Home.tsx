import ButtonHome from "../components/Global/ButtonHome";
import imagenlogo from"../assets/logomys.png"

export default function Home() {
  return (
    <>
      <header className="flex justify-center p-3">
        <img src={imagenlogo} alt="logo" style={{width:"300px ", height:"100px"}} />
      </header>
      <main className="flex justify-center items-center">
        <ButtonHome />
      </main>
    </>
  );
}
