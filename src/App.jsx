import { Navigate, Route, Routes } from "react-router-dom";
// pagine
import Homepage from "./pages/Homepage";
import ServiceDetail from "./pages/ServiceDetail";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/notFound";
import DefaultLayout from "./layout/DefaultLayout";
function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Navigate to={"/homepage"} />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
