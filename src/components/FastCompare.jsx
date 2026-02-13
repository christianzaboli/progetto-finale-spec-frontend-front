import { Link } from "react-router-dom";

export default function FastCompare({ visibility, list, remove }) {
  return (
    <div className={visibility}>
      <ul className="fast-compare-container">
        {list.map((item) => (
          <li className="fast-compare-item" key={item.id}>
            <div>
              <h2>{item.title}</h2>
              <p>
                Categoria: <strong>{item.category}</strong>
              </p>
              {item.contentTypes && (
                <ul className="fast-compare-item-contents">
                  {item.contentTypes.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              )}
              {/* remove btn */}
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => remove(item.id)}
              >
                X
              </div>

              {/* redirect al sito */}
              <Link
                to={item.website}
                style={{
                  color: "#333",
                  textDecoration: "none",
                  position: "absolute",
                  bottom: "0px",
                  right: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Sito
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
