import { useMemo, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
export default function Homepage() {
  // import dati
  const { services, categories } = useGlobalContext();

  // filtri
  const [titleSearch, setTitleSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // ordinamento
  const [sortOrder, setSortOrder] = useState({
    order: 1,
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
      <h1>Benvenuto nel comparatore!</h1>

      {/* ricerca */}
      <input
        type="text"
        placeholder="Cerca il titolo della piattaforma..."
        value={titleSearch}
        onChange={(e) => setTitleSearch(e.target.value)}
      />

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
            order: prev.order * -1,
            text:
              prev.text === "Ordina dalla A-Z"
                ? "Ordina dalla Z-A"
                : "Ordina dalla A-Z",
          }));
        }}
      >
        <p>{sortOrder.text}</p>
      </div>

      {memoedServices.length > 0 && (
        <ul>
          {memoedServices.map((s) => (
            <li key={s.id}>
              {s.title} - {s.category}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
