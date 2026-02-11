import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
export default function Homepage() {
  const { services, categories } = useGlobalContext();
  const [titleSearch, setTitleSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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
      {services.length > 0 && (
        <ul>
          {services.map((s) => (
            <li key={s.id}>
              {s.title} - {s.category}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
