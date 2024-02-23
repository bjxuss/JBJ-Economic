import JBJLogo from "../assets/JBJLogo";
import ButtonHome from "../components/general/ButtonHome";

export default function Home() {
  return (
    <>
      <header className="flex justify-center p-4">
        <JBJLogo />
      </header>

      <main className="flex justify-center items-center">
        <ButtonHome />
      </main>
    </>
  );
}
