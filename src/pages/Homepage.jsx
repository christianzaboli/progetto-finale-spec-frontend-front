import { useMemo, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
export default function Homepage() {
  const { services, categories } = useGlobalContext();
  const [titleSearch, setTitleSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const memoedServices = useMemo(() => {
    // filtro servizi in base alla ricerca input
    const filteredServices = [...services].filter((s) =>
      titleSearch === ""
        ? true
        : s.title.toLocaleLowerCase().includes(titleSearch.toLocaleLowerCase()),
    );

    // filtro servizi (gia filtrati per input) in base alle categorie (evitando hardcode di generi in caso ce ne fossero nuovi)
    if (categoryFilter !== "") {
      const chosenCategory = categories.find((c) => c === categoryFilter);
      return filteredServices.filter((s) => s.category === chosenCategory);
    }

    return filteredServices;
  }, [services, titleSearch, categoryFilter]);

  // render zone --------------------------------
  return (
    <>
      <h1>Benvenuto nel comparatore!</h1>
      <input
        type="text"
        placeholder="Cerca il titolo della piattaforma..."
        value={titleSearch}
        onChange={(e) => setTitleSearch(e.target.value)}
      />
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
