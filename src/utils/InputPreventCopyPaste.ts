const preventCopyPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

export default preventCopyPaste
