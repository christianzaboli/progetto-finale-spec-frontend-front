import { Navigate, NavLink, Route, Routes } from "react-router-dom";
// pagine
import Homepage from "./pages/Homepage";
import ServiceDetail from "./pages/ServiceDetail";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/notFound";
function App() {
  return (
    <>
      <nav>
        <menu>
          <ul>
            <li>
              <NavLink to={"/homepage"}>Cerca</NavLink>
            </li>
            <li>
              <NavLink to={"/favorites"}>Preferiti</NavLink>
            </li>
          </ul>
        </menu>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to={"/homepage"} />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
