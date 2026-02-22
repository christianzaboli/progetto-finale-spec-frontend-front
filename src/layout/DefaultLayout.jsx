import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState, useRef } from "react";
// components
import FastCompare from "../components/FastCompare";
import { useThemeContext } from "../contexts/ThemeContext";
import Toast from "../components/Toast";

export default function DefaultLayout() {
  // context data
  const {
    compareIds,
    getComparingList,
    removeFromCompare,
    showAlertToast,
    resetAlertToast,
  } = useGlobalContext();
  const { theme, changeTheme } = useThemeContext();

  const navigate = useNavigate();
  const location = useLocation();

  //  gestione fast compare e fetch di elementi da comparare
  const [itemsCompared, setItemCompared] = useState([]);
  const [compareContainer, setCompareContainer] = useState("compare-container");
  useEffect(() => {
    if (compareIds.length === 0) {
      setItemCompared([]);
      setCompareContainer("compare-container");
      return;
    }
    getComparingList(compareIds).then((res) => setItemCompared(res));
    setCompareContainer("compare-container active");
  }, [compareIds]);

  // visibilità del drawer fast compare
  const [isOnComparePage, setIsOnComparePage] = useState(false);
  useEffect(() => {
    setIsOnComparePage(location.pathname === "/comparing" ? true : false);
  }, [location]);

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

  // gestione keyboard inputs
  const scrollRef = useRef(null);
  const openDrawerRef = useRef(null);
  const goToCompareRef = useRef(null);
  useEffect(() => {
    function keyClicks(e) {
      const tag = e.target.tagName;

      // punti in cui voglio un normale comportamento
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) {
        return;
      }

      // tasti che utilizzo per il pannello in basso
      if (["ArrowDown", "ArrowUp", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      //azioni
      switch (e.key) {
        case "ArrowUp":
          scrollRef.current.click();
          return;
        case "ArrowDown":
          if (openDrawerRef.current.style.display !== "none") {
            openDrawerRef.current.click();
          }
          return;
        case "ArrowRight":
          if (goToCompareRef.current.style.display !== "none") {
            goToCompareRef.current.click();
          }
          return;
      }
    }
    window.addEventListener("keydown", (e) => keyClicks(e));

    return () => {
      removeEventListener("keydown", (e) => keyClicks(e));
    };
  }, []);
  return (
    <>
      {/* NAVBAR */}
      <header>
        <nav>
          <menu>
            <ul>
              <li>
                <NavLink to={"/search"}>Cerca</NavLink>
              </li>

              <li>
                <NavLink to={"/favorites"}>Preferiti</NavLink>
              </li>
            </ul>
            <div>
              <button onClick={changeTheme}>
                {theme === "light" ? "Dark mode" : "Light mode"}
              </button>
            </div>
          </menu>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main>
        <div className="page">
          <Outlet />
        </div>

        {/* COMPARE SECTION */}
        <button
          ref={scrollRef}
          className="scroll-to-top-btn"
          style={{}}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Torna su <i className="fa-solid fa-angle-up redTXT"></i>
        </button>
        <div style={{ display: isOnComparePage ? "none" : "block" }}>
          <div style={{ position: "relative" }}>
            <button
              ref={goToCompareRef}
              onClick={toDetailedPage}
              style={{
                display: compareIds.length > 1 ? "block" : "none",
              }}
              className="compare-in-detail-btn"
            >
              Compara nel dettaglio{" "}
              <i className="fa-solid fa-angle-right redTXT"></i>
            </button>
            <button
              ref={openDrawerRef}
              onClick={handleVisible}
              className="compare-container-visibility"
              style={{
                display: compareIds.length > 0 ? "block" : "none",
              }}
            >
              {compareContainer === "compare-container" ? (
                <span>
                  Apri comparatore rapido{" "}
                  <i className="fa-solid fa-angle-up redTXT"></i>
                </span>
              ) : (
                <span>
                  Chiudi comparatore rapido{" "}
                  <i className="fa-solid fa-angle-down redTXT"></i>
                </span>
              )}
            </button>
          </div>
          <FastCompare
            visibility={compareContainer}
            list={itemsCompared}
            remove={removeFromCompare}
          ></FastCompare>
        </div>
        {showAlertToast && (
          <Toast
            message={"Limite raggiunto"}
            show={showAlertToast}
            onClose={resetAlertToast}
          ></Toast>
        )}
      </main>
    </>
  );
}
