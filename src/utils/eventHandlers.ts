export const handleNOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setSelectedTiempoOption: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setSelectedTiempoOption(event.target.value); // Actualizar el estado con la opción seleccionada
  };

