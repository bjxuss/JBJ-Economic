import React, { useState } from "react";
import { total_general, TitulosU } from "./Formulas";

const NominaForm = () => {
    const general = 16441.00; // Constante general
    const [tituloSeleccionado, setTituloSeleccionado] = useState("");
    const [totalCalculado, setTotalCalculado] = useState(0);

    const handleChangeTitulo = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTituloSeleccionado(event.target.value);
    };

    const handleCalcularTotal = () => {
        if (tituloSeleccionado !== "") {
            const total = total_general(general, tituloSeleccionado === "medicos" ? TitulosU.medicos : TitulosU.otros);
            setTotalCalculado(total);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Esta es la nómina</h1>
            <form>
                <div className="mb-4">
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Tipo de Título:</label>
                    <select id="titulo" value={tituloSeleccionado} onChange={handleChangeTitulo} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="">Selecciona un tipo de título</option>
                        <option value="medicos">Médicos</option>
                        <option value="otros">Otros</option>
                    </select>
                </div>
                <button type="button" onClick={handleCalcularTotal} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Calcular</button>
            </form>
            {totalCalculado !== 0 && (
                <p className="mt-4">Total calculado: {totalCalculado}</p>
            )}
        </div>
    );
};

export default NominaForm;
