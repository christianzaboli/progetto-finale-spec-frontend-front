import { useGlobalContext } from "../contexts/GlobalContext";
import { memo } from "react";

function ComparaBtn({ labelClasses = "compare-btn-label", id }) {
  const { compareIds, handleAddToCompare } = useGlobalContext();

  return (
    <label className={labelClasses}>
      Compara
      <input
        className="compare-btn"
        type="checkbox"
        checked={compareIds.includes(id)}
        onChange={() => handleAddToCompare(id)}
      ></input>
    </label>
  );
}
export default memo(ComparaBtn);
