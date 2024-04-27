export const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = event.charCode;
    const char = String.fromCharCode(charCode);
  
    // Solo permitir números y el punto
    if (!/^\d*\.?\d*$/.test(char)) {
      event.preventDefault();
    }
};

  