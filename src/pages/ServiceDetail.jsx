import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useParams, useNavigate } from "react-router-dom";

// components
import GenericButton from "../components/GenericButton";
import DetailedTable from "../components/DetailedTable";

export default function ServiceDetail() {
  const {
    getDetailedService,
    favs,
    handleFavorites,
    compareIds,
    handleAddToCompare,
  } = useGlobalContext();

  const paramsId = useParams();
  const navigate = useNavigate();

  // servizio selezionato
  const [service, setService] = useState(null);

  // fetch al montaggio del servizio richiesto
  useEffect(() => {
    getDetailedService(parseInt(paramsId.id)).then((res) => {
      if (!res) {
        navigate("/404");
        return;
      }
      setService(res.service);
    });
  }, []);

  return (
    <>
      {service && (
        <>
          <div className="detail-title">
            <h1>{service.title}</h1>
            <img
              className="page-logo"
              src={service?.logoUrl}
              alt={`${service.title.toLowerCase()}-logo`}
            />
          </div>
          <DetailedTable service={service} />

          <div className="details-buttons">
            <GenericButton
              labelName="Compara"
              labelClasses="compare-btn-label"
              btnClasses="compare-btn"
              type="checkbox"
              checked={compareIds.includes(service.id)}
              onChange={() => handleAddToCompare(service.id)}
            />

            <GenericButton
              onClick={() => handleFavorites(service.id)}
              children={
                <i
                  className="fa-solid fa-heart"
                  style={{
                    color: favs.includes(service.id) && "red",
                  }}
                ></i>
              }
            />
          </div>
        </>
      )}
    </>
  );
}
