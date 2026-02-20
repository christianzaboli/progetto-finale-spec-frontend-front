import { Navigate, Route, Routes } from "react-router-dom";
// pagine
import Searchpage from "./pages/Searchpage";
import ServiceDetail from "./pages/ServiceDetail";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./layout/DefaultLayout";
import Comparing from "./pages/Comparing";
function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Navigate to={"/search"} />} />
          <Route path="/search" element={<Searchpage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/comparing" element={<Comparing />} />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
