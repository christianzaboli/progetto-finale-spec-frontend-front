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
        navigate("/404");
        return;
      }
      setService(res.service);
    });
  }, []);

  const renderList = (
    items,
    fallback = <span className="redTXT">Dato non disponibile</span>,
    formatter = (item) => item,
  ) => {
    if (!items?.length) return fallback;
    return items.map((item, i) => <p key={i}>{formatter(item)}</p>);
  };

  const [localizationGroup, setLocalizationGroup] = useState(true);
  const [plansGroup, setPlansGroup] = useState(true);
  const [qualityGroup, setQualityGroup] = useState(true);
  const [genericsGroup, setGenericsGroup] = useState(true);

  return (
    <>
      {service && (
        <>
          <h1>{service.title}</h1>
          <div className="table-scroll">
            <table>
              <tbody>
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
                    <div>Categoria</div>
                  </td>
                  <td>{service.category}</td>
                </tr>

                <tr className="tr-spacer">
                  <td colSpan={2} />
                </tr>
                <tr onClick={() => setLocalizationGroup(!localizationGroup)}>
                  <td className="group-td-title">
                    Localizzazione{" "}
                    <span>
                      {localizationGroup ? (
                        <i className="fa-solid fa-angle-up"></i>
                      ) : (
                        <i className="fa-solid fa-angle-down"></i>
                      )}
                    </span>
                  </td>
                </tr>
                {localizationGroup && (
                  <>
                    <tr>
                      <td>
                        <div>Disponibilità</div>
                      </td>
                      <td>{renderList(service.countries)}</td>
                    </tr>
                    <tr>
                      <td>
                        <div>Lingue d'interfaccia</div>
                      </td>
                      <td>{renderList(service.uiLanguages)}</td>
                    </tr>
                    <tr>
                      <td>
                        <div>Lingue audio</div>
                      </td>
                      <td>{renderList(service.audioLanguages)}</td>
                    </tr>
                    <tr>
                      <td>
                        <div>Lingue di sottotitoli</div>
                      </td>
                      <td>{renderList(service.subtitleLanguages)}</td>
                    </tr>
                  </>
                )}

                <tr className="tr-spacer">
                  <td colSpan={2} />
                </tr>
                <tr onClick={() => setPlansGroup(!plansGroup)}>
                  <td className="group-td-title">
                    Abbonamenti{" "}
                    <span>
                      {plansGroup ? (
                        <i className="fa-solid fa-angle-up"></i>
                      ) : (
                        <i className="fa-solid fa-angle-down"></i>
                      )}
                    </span>
                  </td>
                </tr>
                {plansGroup && (
                  <>
                    <tr>
                      <td>
                        <div>Ci sono Ads?</div>
                      </td>
                      <td>
                        {service.hasAds ? (
                          <i
                            className="fa-solid fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-x"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>Ci sono abbonamenti con Ads?</div>
                      </td>
                      <td>
                        {service.hasAdTier ? (
                          <i
                            className="fa-solid fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-x"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>Numero di Ads all'ora</div>
                      </td>
                      <td>{renderList(service.avgAdsPerHour)}</td>
                    </tr>
                    <tr>
                      <td>
                        <div>Prezzo abbonamento mensile</div>
                      </td>
                      <td>
                        {service.pricesMonthly?.length ? (
                          service.pricesMonthly.map((plan, i) => (
                            <p key={i}>
                              {service.planNames?.[i]}: <strong>{plan}€</strong>
                            </p>
                          ))
                        ) : (
                          <span className="redTXT">Dato non disponibile</span>
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
                        {service.includesAdsByPlan?.length ? (
                          service.includesAdsByPlan.map((plan, i) => (
                            <p key={i}>
                              {service.planNames?.[i]}:{" "}
                              <strong>
                                {plan ? (
                                  <i
                                    className="fa-solid fa-check"
                                    style={{ color: "green" }}
                                  ></i>
                                ) : (
                                  <i
                                    className="fa-solid fa-x"
                                    style={{ color: "red" }}
                                  ></i>
                                )}
                              </strong>
                            </p>
                          ))
                        ) : (
                          <span className="redTXT">Dato non disponibile</span>
                        )}
                      </td>
                    </tr>
                  </>
                )}

                <tr className="tr-spacer">
                  <td colSpan={2} />
                </tr>
                <tr onClick={() => setQualityGroup(!qualityGroup)}>
                  <td className="group-td-title">
                    Qualità di trasmissione{" "}
                    <span>
                      {qualityGroup ? (
                        <i className="fa-solid fa-angle-up"></i>
                      ) : (
                        <i className="fa-solid fa-angle-down"></i>
                      )}
                    </span>
                  </td>
                </tr>
                {qualityGroup && (
                  <>
                    <tr>
                      <td>
                        <div>Qualità streaming</div>
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
                      <td>{renderList(service.simultaneousStreamsMax)}</td>
                    </tr>
                    <tr>
                      <td>
                        <div>Download Offline</div>
                      </td>
                      <td>
                        {service.offlineDownloads ? (
                          <i
                            className="fa-solid fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-x"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                    </tr>
                  </>
                )}

                <tr className="tr-spacer">
                  <td colSpan={2} />
                </tr>
                <tr onClick={() => setGenericsGroup(!genericsGroup)}>
                  <td className="group-td-title">
                    Generiche{" "}
                    <span>
                      {genericsGroup ? (
                        <i className="fa-solid fa-angle-up"></i>
                      ) : (
                        <i className="fa-solid fa-angle-down"></i>
                      )}
                    </span>
                  </td>
                </tr>
                {genericsGroup && (
                  <>
                    <tr>
                      <td>
                        <div>Contenuti principali</div>
                      </td>
                      <td>{renderList(service.contentTypes)}</td>
                    </tr>
                    <tr>
                      <td>
                        <div>Generi più visti</div>
                      </td>
                      <td>{renderList(service.topGenres)}</td>
                    </tr>
                    <tr>
                      <td>
                        <div>Contenuti originali</div>
                      </td>
                      <td>
                        {service.originalContents ? (
                          <i
                            className="fa-solid fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-x"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>Filtro famiglia</div>
                      </td>
                      <td>
                        {service.parentalControls ? (
                          <i
                            className="fa-solid fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-x"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
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
                      <td>{renderList(service.monthlyWatchers)}</td>
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
                    <tr>
                      <td>
                        <div>Score</div>
                      </td>
                      <td>{service.score ?? "Dato non disponibile"}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
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
        </>
      )}
    </>
  );
}
