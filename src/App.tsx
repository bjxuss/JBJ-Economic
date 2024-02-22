import RouterComponent from "./Routes/RouterComponent";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
