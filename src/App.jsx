import { Navigate, Route, Routes } from "react-router-dom";
// pagine
import Homepage from "./pages/Homepage";
import ServiceDetail from "./pages/ServiceDetail";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/homepage"} />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
    </>
  );
}

export default App;
