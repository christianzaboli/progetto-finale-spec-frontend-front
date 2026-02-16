import { useMemo, useState, useCallback } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

// debounce base
function debounce(fn, time) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(value);
    }, time);
  };
}

export default function Homepage() {
  const navigate = useNavigate();
  // import dati
  const {
    services,
    categories,
    compareIds,
    handleAddToCompare,
    setFavs,
    favs,
  } = useGlobalContext();

  // filtri
  const [titleSearch, setTitleSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // attivazione useCallback + debounce
  const debouncedSearch = useCallback(debounce(setTitleSearch, 200), []);

  // ordinamento
  const [sortOrder, setSortOrder] = useState({
    order: 0,
    text: "Ordina dalla A-Z",
  });

  const memoedServices = useMemo(() => {
    // filtro servizi in base alla ricerca input
    const filteredServices = [...services].filter((s) =>
      titleSearch === ""
        ? true
        : s.title.toLocaleLowerCase().includes(titleSearch.toLocaleLowerCase()),
    );
    const chosenCategory = categories.find((c) => c === categoryFilter);

    //ordimaneto a-z z-a per titolo (da ampliare)
    filteredServices.sort(
      (a, b) => a.title.localeCompare(b.title) * sortOrder.order,
    );

    // filtro servizi (gia filtrati per input) in base alle categorie (evitando hardcode di generi in caso ce ne fossero nuovi)
    if (categoryFilter !== "") {
      return filteredServices.filter((s) => s.category === chosenCategory);
    }

    return filteredServices;
  }, [services, titleSearch, categoryFilter, sortOrder]);

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
              onChange={(e) => setCategoryFilter(e.target.value)}
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
        {memoedServices.length > 0 && (
          <ul className="services-list">
            {memoedServices.map((s) => (
              <li key={s.id}>
                <p>
                  {s.title}
                  {/* - {s.category} */}
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
                <button
                  onClick={() => setFavs([...favs, s.id])}
                  disabled={favs.includes(s.id)}
                >
                  Aggiungi ai preferiti
                </button>
                {favs.includes(s.id) && (
                  <button
                    className="btn-fav-home"
                    onClick={() => setFavs(favs.filter((f) => f !== s.id))}
                  >
                    Rimuovi dai preferiti
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
