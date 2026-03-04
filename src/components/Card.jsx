import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { memo } from "react";
import GenericButton from "./GenericButton";

function Card({ props }) {
  const { title, category, contentTypes, id } = props;
  const { handleFavorites, favs, compareIds, handleAddToCompare } =
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
        <GenericButton
          labelName="Compara"
          labelClasses="compare-btn-label"
          btnClasses="compare-btn"
          type="checkbox"
          checked={compareIds.includes(id)}
          onChange={() => handleAddToCompare(id)}
        />
        <GenericButton
          onClick={() => handleFavorites(id)}
          btnClasses="fav-page-btn"
          children={
            <i
              className="fa-solid fa-heart"
              style={{
                color: favs.includes(id) && "red",
              }}
            ></i>
          }
        />
      </div>
    </>
  );
}
export default memo(Card);
