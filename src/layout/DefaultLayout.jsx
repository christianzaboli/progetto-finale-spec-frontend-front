import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";

// components
import FastCompare from "../components/FastCompare";

export default function DefaultLayout() {
  const { compareIds, getComparingList, removeFromCompare } =
    useGlobalContext();
  const [itemsCompared, setItemCompared] = useState([]);
  const [compareContainer, setCompareContainer] = useState("compare-container");
  const navigate = useNavigate();

  //  gestione fast compare e fetch di elementi da comparare
  useEffect(() => {
    if (compareIds.length === 0) {
      setItemCompared([]);
      setCompareContainer("compare-container");
      return;
    }
    getComparingList().then((res) => setItemCompared(res));
    setCompareContainer("compare-container active");
  }, [compareIds]);

  // Click btn per mostrare fast compare
  const handleVisible = () => {
    if (compareContainer === "compare-container") {
      setCompareContainer("compare-container active");
    } else {
      setCompareContainer("compare-container");
    }
  };

  // Click btn per andare al compare dettagliato
  const toDetailedPage = () => {
    setCompareContainer("compare-container");
    navigate("/comparing");
  };

  return (
    <>
      {/* NAVBAR */}
      <header>
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
      </header>

      {/* MAIN CONTENT */}
      <main>
        <Outlet />
      </main>

      {/* COMPARE SECTION */}
      <div style={{ position: "relative" }}>
        <button
          onClick={toDetailedPage}
          style={{ opacity: compareIds.length > 1 ? "100" : "0" }}
          className="compare-in-detail-btn"
        >
          Compara nel dettaglio
        </button>
        <button
          onClick={handleVisible}
          className="compare-container-visibility"
          style={{ opacity: compareIds.length > 0 ? "100" : "0" }}
        >
          {compareContainer === "compare-container" ? "Apri" : "Chiudi"}
        </button>
      </div>
      <FastCompare
        visibility={compareContainer}
        list={itemsCompared}
        remove={removeFromCompare}
      ></FastCompare>
    </>
  );
}
