import { useMemo, useState, useCallback } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { debounce } from "../assets/utils";

export default function Homepage() {
  const navigate = useNavigate();

  // import dati
  const {
    services,
    categories,
    compareIds,
    handleAddToCompare,
    handleFavorites,
    favs,
    query,
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

  const memoedServices = useMemo(() => {
    const filteredServices = [...services];
    //ordinamento a-z z-a per titolo (da ampliare)
    filteredServices.sort(
      (a, b) => a.title.localeCompare(b.title) * sortOrder.order,
    );
    return filteredServices;
  }, [services, query, sortOrder]);

  // RENDER ZZZZZONE --------------------------------
  return (
    <>
      <div className="page">
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
              name={categories}
              onChange={(e) => handleCategory(e.target.value)}
            >
              <option value={""}>Seleziona una categoria</option>
              {categories?.length > 0 &&
                categories.map((c, i) => {
                  return (
                    <option value={c} key={i}>
                      {c}
                    </option>
                  );
                })}
            </select>

            {/* ordimanto */}
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
              <li key={s.id}>
                <p>
                  {s.title}
                  <span style={{ color: "lightgray" }}>/{s.category}</span>
                </p>
                <label className="compare-btn-label">
                  Compara
                  <input
                    className="compare-btn"
                    type="checkbox"
                    checked={compareIds.includes(s.id)}
                    onChange={() => handleAddToCompare(s.id)}
                  ></input>
                </label>
                <button onClick={() => navigate(`/services/${s.id}`)}>
                  Dettagli
                </button>
                <button onClick={() => handleFavorites(s.id)}>
                  <i
                    className="fa-solid fa-heart"
                    style={{ color: favs.includes(s.id) ? "red" : "black" }}
                  ></i>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nessun risultato</p>
        )}
      </div>
    </>
  );
}
