import JBJLogo from "../assets/JBJLogo";
import ButtonHome from "../components/Global/ButtonHome";

export default function Home() {
  return (
    <>
      <header className="flex justify-center p-3">
        <JBJLogo />
      </header>
      <main className="flex justify-center items-center">
        <ButtonHome />
      </main>
    </>
  );
}
