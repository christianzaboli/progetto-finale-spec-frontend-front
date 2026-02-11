import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalProvider from "./contexts/GlobalContext";
// pagine
import Homepage from "./pages/Homepage";
import ServiceDetail from "./pages/ServiceDetail";
function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/service/:slug" element={<ServiceDetail />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
