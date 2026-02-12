import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useParams } from "react-router-dom";
export default function ServiceDetail() {
  const { getDetailedMovie } = useGlobalContext();
  const paramsId = useParams();

  // servizio selezionato
  const [service, setService] = useState([]);

  // fetch al montaggio del servizio richiesto
  useEffect(() => {
    getDetailedMovie(parseInt(paramsId.id)).then((res) =>
      setService(res.service),
    );
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
        </div>
      )}
    </>
  );
}
