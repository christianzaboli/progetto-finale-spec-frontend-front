import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { memo } from "react";
import ComparaBtn from "./ComparaBtn";

function Card({ props }) {
  const { title, category, contentTypes, id } = props;
  const { handleFavorites, favs } = useGlobalContext();

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
        <ComparaBtn
          labelClasses={"compare-btn-label fav-page-compare"}
          id={id}
        />

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
export default memo(Card);
