// import { useGlobalContext } from "../contexts/GlobalContext";

export default function GenericButton({
  labelName = "",
  labelClasses = "",
  btnClasses = "",
  type = "",
  children,
  onClick = () => {},
  checked = "",
  onChange = () => {},
}) {
  if (!labelName)
    return (
      <button className={btnClasses} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <label className={labelClasses}>
      {labelName}
      <input
        className={btnClasses}
        type={type}
        checked={checked}
        onChange={onChange}
        onClick={onClick}
      >
        {children}
      </input>
    </label>
  );
}
