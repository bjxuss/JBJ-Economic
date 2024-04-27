import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Interes_Simple from "../pages/Interes_Simple";
import InteresCompuesto from "../pages/InteresCompuesto/InteresCompuesto";
import Anualidad from "../pages/Anualidad";
import Gradiente from "../pages/Gradiente/Gradiente";

export default function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/is" element={<Interes_Simple/>} />
      <Route path="ic" element={<InteresCompuesto/>} />
      <Route path="/an" element={<Anualidad/>} />
      <Route path="gr" element={<Gradiente/>} />
    </Routes>
  );
}
