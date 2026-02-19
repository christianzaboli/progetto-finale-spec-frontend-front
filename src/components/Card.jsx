import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Card({ props }) {
  const { title, category, contentTypes, id } = props;
  const { handleFavorites, favs, handleAddToCompare, compareIds } =
    useGlobalContext();

  return (
    <>
      <div className="card">
        <Link to={`/services/${id}`}>{title}</Link>
        <small>Categoria: {category}</small>
        <ul>
          {contentTypes.map((c, i) => (
            <li key={i} className="fast-compare-item-contents">
              {c}
            </li>
          ))}
        </ul>
        <label className="compare-btn-label fav-page-compare">
          Compara
          <input
            className="compare-btn"
            type="checkbox"
            checked={compareIds.includes(id)}
            onChange={() => handleAddToCompare(id)}
          ></input>
        </label>
        <button onClick={() => handleFavorites(id)} className="fav-page-btn">
          <i
            className="fa-solid fa-heart"
            style={{ color: favs.includes(id) ? "red" : "black" }}
          ></i>
        </button>
      </div>
    </>
  );
}
