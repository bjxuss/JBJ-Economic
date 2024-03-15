import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Nomina from "../pages/Nomina";

export default function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/nomina" element={<Nomina/>} />
      </Routes>
  );
}
