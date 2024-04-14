import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Interes_Simple from "../pages/Interes_Simple";
import InteresCompuesto from "../pages/InteresCompuesto/InteresCompuesto";
import Anualidad from "../pages/Anualidad";
import Tasa_Interes_Retorno from "../pages/Tasa_Interes_Retorno";

export default function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/is" element={<Interes_Simple/>} />
      <Route path="ic" element={<InteresCompuesto/>} />
      <Route path="/an" element={<Anualidad/>} />
      <Route path="/tir" element={<Tasa_Interes_Retorno />} />
    </Routes>
  );
}
