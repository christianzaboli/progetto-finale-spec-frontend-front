import { NavLink, Outlet } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState, useRef } from "react";
export default function DefaultLayout() {
  const { compareIds, getComparingList } = useGlobalContext();
  const [itemsCompared, setItemCompared] = useState([]);
  const [compareBtn, setCompareBtn] = useState("Apri vs");
  const [compareContainer, setCompareContainer] = useState("compare-container");
  const compareContainerRef = useRef();

  useEffect(() => {
    if (compareIds.length === 0) {
      setItemCompared([]);
      setCompareContainer("compare-container");
      return;
    }
    getComparingList().then((res) => setItemCompared(res));
    setCompareContainer("compare-container active");
    console.log(itemsCompared);
  }, [compareIds]);

  const handleVisible = () => {
    if (compareContainer === "compare-container") {
      setCompareContainer("compare-container active");
      setCompareBtn("Chiudi vs");
    } else {
      setCompareContainer("compare-container");
      setCompareBtn("Apri vs");
    }
  };
  return (
    <>
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
      <main>
        <Outlet />
        <button
          onClick={handleVisible}
          className="compare-container-visibility"
        >
          {compareBtn}
        </button>

        <div className={compareContainer}></div>
      </main>
      <footer></footer>
    </>
  );
}
