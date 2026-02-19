import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function ServiceDetail() {
  const {
    getDetailedService,
    compareIds,
    handleAddToCompare,
    favs,
    handleFavorites,
  } = useGlobalContext();
  const paramsId = useParams();
  const navigate = useNavigate();
  // servizio selezionato
  const [service, setService] = useState(null);

  // fetch al montaggio del servizio richiesto
  useEffect(() => {
    getDetailedService(parseInt(paramsId.id)).then((res) => {
      if (!res) {
        navigate("/");
        return;
      }
      setService(res.service);
    });
  }, []);

  const renderList = (
    items,
    fallback = <span className="redTXT">Dato non disponibile</span>,
    suffix = "",
  ) => {
    if (!items?.length) return fallback;
    return items.map((item, i) => <p key={i}>{`${item}${suffix}`}</p>);
  };

  return (
    <>
      {service && (
        <div className="page">
          <h1>{service.title}</h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <div>Categoria</div>
                </td>
                <td>{service.category}</td>
              </tr>
              <tr>
                <td>
                  <div>Sito Web</div>
                </td>
                <td>
                  <a href={service.website}>{service.website?.slice(8)}</a>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Disponibilita</div>
                </td>
                <td>
                  {service.countries?.join(" ") ?? "Dato non disponibile"}
                </td>
              </tr>
              <tr>
                <td>
                  <div>Lingue d'interfaccia</div>
                </td>
                <td>
                  {service.uiLanguages?.join(" ") ?? "Dato non disponibile"}
                </td>
              </tr>
              <tr>
                <td>
                  <div>Lingue audio</div>
                </td>
                <td>
                  {service.audioLanguages?.join(" ") ?? "Dato non disponibile"}
                </td>
              </tr>
              <tr>
                <td>
                  <div>Lingue di sottotitoli</div>
                </td>
                <td>
                  {service.subtitleLanguages?.join(" ") ??
                    "Dato non disponibile"}
                </td>
              </tr>
              <tr>
                <td>
                  <div>Ci sono Ads?</div>
                </td>
                <td>{service.hasAds ? "Si" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <div>Ci sono abbonamenti con Ads?</div>
                </td>
                <td>{service.hasAdTier ? "Si" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <div>Numero di Ads all'ora</div>
                </td>
                <td>{service.avgAdsPerHour ?? "Dato non disponibile"}</td>
              </tr>
              <tr>
                <td>
                  <div>Abbonamenti</div>
                </td>
                <td>{renderList(service.planNames)}</td>
              </tr>
              <tr>
                <td>
                  <div>Prezzo abbonamento mensile</div>
                </td>
                <td>
                  {renderList(
                    service.pricesMonthly,
                    "Dato non disponibile",
                    "€",
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <div>Ricorrenza abbonamento</div>
                </td>
                <td>{renderList(service.billingPeriods)}</td>
              </tr>
              <tr>
                <td>
                  <div>Il piano include Ads?</div>
                </td>
                <td>
                  {service.includesAdsByPlan?.length
                    ? service.includesAdsByPlan.map((plan, i) => (
                        <p key={i}>{plan ? "Si" : "No"}</p>
                      ))
                    : "Dato non disponibile"}
                </td>
              </tr>
              <tr>
                <td>
                  <div>Qualita streaming</div>
                </td>
                <td>{renderList(service.streamingQuality)}</td>
              </tr>
              <tr>
                <td>
                  <div>Supporto HDR</div>
                </td>
                <td>{renderList(service.hdrSupport)}</td>
              </tr>
              <tr>
                <td>
                  <div>Supporto Audio</div>
                </td>
                <td>{renderList(service.audioSupport)}</td>
              </tr>
              <tr>
                <td>
                  <div>Dispositivi supportati</div>
                </td>
                <td>{renderList(service.supportedDevices)}</td>
              </tr>
              <tr>
                <td>
                  <div>Schermi simultanei</div>
                </td>
                <td>
                  {service.simultaneousStreamsMax ?? "Dato non disponibile"}
                </td>
              </tr>
              <tr>
                <td>
                  <div>Download Offline</div>
                </td>
                <td>{service.offlineDownloads ? "Si" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <div>Tipi di contenuto</div>
                </td>
                <td>{renderList(service.contentTypes)}</td>
              </tr>
              <tr>
                <td>
                  <div>Generi piu visti</div>
                </td>
                <td>{renderList(service.topGenres)}</td>
              </tr>
              <tr>
                <td>
                  <div>Contenuti originali</div>
                </td>
                <td>{service.originalContents ? "Si" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <div>Filtro famiglia</div>
                </td>
                <td>{service.parentalControls ? "Si" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <div>Numero di iscritti</div>
                </td>
                <td>{service.subCount ?? "Dato non disponibile"}</td>
              </tr>
              <tr>
                <td>
                  <div>Visitatori mensili</div>
                </td>
                <td>{service.monthlyWatchers ?? "Dato non disponibile"}</td>
              </tr>
              <tr>
                <td>
                  <div>Score</div>
                </td>
                <td>{service.score ?? "Dato non disponibile"}</td>
              </tr>
              <tr>
                <td>
                  <div>Ultimo Aggiornamento</div>
                </td>
                <td>
                  {service.lastUpdated
                    ? dayjs(service.lastUpdated).format("DD/MM/YYYY")
                    : "Dato non disponibile"}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="details-buttons">
            <label className="compare-btn-label">
              Compara
              <input
                className="compare-btn"
                type="checkbox"
                checked={compareIds.includes(service.id)}
                onChange={() => handleAddToCompare(service.id)}
              ></input>
            </label>
            <button onClick={() => handleFavorites(service.id)}>
              <i
                className="fa-solid fa-heart"
                style={{ color: favs.includes(service.id) ? "red" : "black" }}
              ></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
