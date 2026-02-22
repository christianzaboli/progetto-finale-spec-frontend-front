import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { debounce } from "../assets/utils";
import ComparaBtn from "../components/ComparaBtn";
export default function Searchpage() {
  const navigate = useNavigate();

  // import dati global
  const {
    categories,
    services,
    handleFavorites,
    favs,
    query,
    categoryFilter,
    handleQuery,
    handleCategory,
  } = useGlobalContext();

  // attivazione useCallback + debounce
  const debouncedSearch = useCallback(debounce(handleQuery, 300), []);

  // ordinamento
  const [sortOrder, setSortOrder] = useState({
    order: 0,
    text: "Ordina dalla A-Z",
  });

  // numero di elementi visibili
  const [visibleCount, setVisibleCount] = useState(8);
  useEffect(() => {
    setVisibleCount(8);
  }, [query, categoryFilter]);

  const memoedServices = useMemo(() => {
    const filteredServices = [...services];

    //ordinamento a-z z-a per titolo (da ampliare)
    filteredServices.sort(
      (a, b) => a.title.localeCompare(b.title) * sortOrder.order,
    );
    return filteredServices.slice(0, visibleCount);
  }, [services, query, sortOrder, visibleCount]);

  // reset query
  useEffect(() => {
    return () => {
      handleQuery("");
      handleCategory("");
    };
  }, []);

  const categorySelectRef = useRef(null);

  // RENDER ZZZZZONE --------------------------------
  return (
    <>
      <h1>Benvenuto nel comparatore!</h1>
      <div>
        {/* ricerca */}
        <input
          type="text"
          placeholder="Cerca il titolo della piattaforma..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <div>
          {/* filtro categoria */}
          <select
            ref={categorySelectRef}
            name={categories}
            onChange={(e) => handleCategory(e.target.value)}
          >
            <option value={""}>Seleziona una categoria</option>
            {categories.length > 0 &&
              categories.map((c, i) => {
                return (
                  <option value={c.toLowerCase()} key={i}>
                    {c}
                  </option>
                );
              })}
          </select>

          {/* ordinamento */}
          <div
            className={"sortAZ"}
            onClick={() => {
              setSortOrder((prev) => ({
                order: prev.order === 0 ? 1 : prev.order * -1,
                text:
                  prev.text === "Ordina dalla A-Z"
                    ? "Ordina dalla Z-A"
                    : "Ordina dalla A-Z",
              }));
            }}
          >
            <p>{sortOrder.text}</p>
          </div>
        </div>
      </div>

      {/* lista servizi */}
      {memoedServices.length > 0 ? (
        <ul className="services-list">
          {memoedServices.map((s) => (
            // titolo e categoria
            <li key={s.id}>
              <p>
                <span onClick={() => navigate(`/services/${s.id}`)}>
                  {s.title}
                </span>
                <span
                  style={{ color: "lightgray" }}
                  onClick={() => {
                    categorySelectRef.current.value = s.category;
                    handleCategory(s.category);
                  }}
                >
                  /{s.category}
                </span>
              </p>

              {/* buttons */}
              <ComparaBtn id={s.id} />
              <button onClick={() => navigate(`/services/${s.id}`)}>
                Dettagli
              </button>
              <button onClick={() => handleFavorites(s.id)}>
                <i
                  className="fa-solid fa-heart"
                  style={{
                    color: favs.includes(s.id) && "red",
                  }}
                ></i>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nessun risultato</p>
      )}
      {services.length > visibleCount && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          className="load-more-btn"
        >
          Carica altri
        </button>
      )}
    </>
  );
}
