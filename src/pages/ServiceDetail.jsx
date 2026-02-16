import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useParams, useNavigate } from "react-router-dom";
export default function ServiceDetail() {
  const { getDetailedService, compareIds, handleAddToCompare, favs, setFavs } =
    useGlobalContext();
  const paramsId = useParams();
  const navigate = useNavigate();
  // servizio selezionato
  const [service, setService] = useState([]);

  // fetch al montaggio del servizio richiesto
  useEffect(() => {
    getDetailedService(parseInt(paramsId.id)).then((res) => {
      if (!res) {
        navigate("/");
      }
      setService(res.service);
    });
  }, []);
  return (
    <>
      {service && (
        <div className="page">
          <h1>{service.title}</h1>
          <p>
            Categoria di servizio: <span>{service.category}</span>
          </p>
          <a href={service.website}>Sito Web</a>

          <ul>
            <li>tipi di contenuti:</li>
            {service.contentTypes?.map((c, i) => {
              return <li key={i}>{c}</li>;
            })}
          </ul>
          <section>
            <p>
              Ha un piano premium? {service.planNames?.length > 0 ? "Si" : "No"}
            </p>
            <ul>
              <li>Piani premium:</li>
              {service.planNames?.map((plan, i) => {
                return (
                  <li key={i}>
                    <span
                      className={
                        service.includesAdsByPlan[i]
                          ? "plan-with-ads-text"
                          : "plan-without-ads-text"
                      }
                    >
                      {plan}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
          <div className="details-buttons">
            <label className="compare-btn-label">
              Compare
              <input
                className="compare-btn"
                type="checkbox"
                checked={compareIds.includes(service.id)}
                onChange={() => handleAddToCompare(service.id)}
              ></input>
            </label>
            <button
              onClick={() => setFavs([...favs, service.id])}
              enabled="true"
              disabled={favs.includes(service.id)}
            >
              Aggiungi ai preferiti
            </button>

            {favs.includes(service.id) && (
              <button
                onClick={() => setFavs(favs.filter((f) => f !== service.id))}
              >
                Rimuovi dai preferiti
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
