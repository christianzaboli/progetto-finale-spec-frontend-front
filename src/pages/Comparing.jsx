import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// molti dati = molto copia incolla per la tabella, molto probabilmente ci sono ~artefatti~ nelle funzioni di mappatura

export default function Comparing() {
  // mounting lista dettagliata dei servizi da comparare
  const { getComparingList, compareIds, removeFromCompare } =
    useGlobalContext();
  const [services, setServices] = useState(null);

  const renderList = (
    items,
    fallback = <span className="redTXT">Dato non disponibile</span>,
    formatter = (item) => item,
  ) => {
    if (!items?.length) return fallback;
    return items.map((item, i) => <p key={i}>{formatter(item)} </p>);
  };

  useEffect(() => {
    compareIds.length > 0
      ? getComparingList(compareIds).then((res) => setServices(res))
      : setServices(null);
  }, [compareIds]);

  const [localizationGroup, setLocalizationGroup] = useState(true);
  const [plansGroup, setPlansGroup] = useState(true);
  const [qualityGroup, setQualityGroup] = useState(true);
  const [genericsGroup, setGenericsGroup] = useState(true);

  return (
    <>
      <h1>Comparing</h1>
      {services ? (
        <div className="table-scroll">
          <table>
            {/* Head */}
            <thead>
              {/* buttons gestionali */}
              {/* <tr>
                  <td style={{ display: "table-row-group" }}></td>
                  {services.map((s) => (
                    <td key={s.id}>
                      <div>
                        <button onClick={() => removeFromCompare(s.id)}>
                          X
                        </button>
                      </div>
                    </td>
                  ))}
                </tr> */}
              {/* Titolo */}
              <tr>
                <td style={{ display: "table-row-group" }}></td>
                {services.map((s) => (
                  <td key={s.id}>
                    <div className="title-table">
                      <Link to={`/services/${s.id}`}>{s.title}</Link>
                      <button onClick={() => removeFromCompare(s.id)}>X</button>
                    </div>
                  </td>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {/* Sito web */}
              <tr>
                <td>
                  <div>Sito Web</div>
                </td>
                {services.map((s) => (
                  <td key={s.id}>
                    <a href={s.website}>{s.website.slice(8)}</a>
                  </td>
                ))}
              </tr>
              {/* Categoria */}
              <tr>
                <td>
                  <div>Categoria</div>
                </td>
                {services.map((s) => (
                  <td key={s.id}>{s.category}</td>
                ))}
              </tr>

              {/* FOLDER LOCALIZZAZIONE */}
              <tr className="tr-spacer">
                <td colSpan={services.length + 1} />
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
                  {/* Disponibilita */}
                  <tr>
                    <td>
                      <div>Disponibilità</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.countries)}</td>
                    ))}
                  </tr>
                  {/* uiLanguages */}
                  <tr>
                    <td>
                      <div>Lingue d'interfaccia</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.uiLanguages)}</td>
                    ))}
                  </tr>
                  {/* audioLanguages */}
                  <tr>
                    <td>
                      <div>Lingue audio</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.audioLanguages)}</td>
                    ))}
                  </tr>
                  {/* subtitleLanguages */}
                  <tr>
                    <td>
                      <div>Lingue di sottotitoli</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.subtitleLanguages)}</td>
                    ))}
                  </tr>
                </>
              )}

              {/* FOLDER ABBONAMENTI */}
              <tr className="tr-spacer">
                <td colSpan={services.length + 1} />
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
                  {/* hasAds */}
                  <tr>
                    <td>
                      <div>Ci sono Ads?</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>
                        {s.hasAds ? (
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
                    ))}
                  </tr>
                  {/* hasAdTier */}
                  <tr>
                    <td>
                      <div>Ci sono abbonamenti con Ads?</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>
                        {s.hasAds ? (
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
                    ))}
                  </tr>
                  {/* avgAdsPerHour */}
                  <tr>
                    <td>
                      <div>Numero di Ads all'ora</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.avgAdsPerHour)}</td>
                    ))}
                  </tr>

                  <tr>
                    <td>
                      <div>Prezzo abbonamento mensile</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>
                        {s.pricesMonthly.map((plan, i) => {
                          return (
                            <p key={i}>
                              {s.planNames[i]}: <strong>{plan}€</strong>
                            </p>
                          );
                        })}
                      </td>
                    ))}
                  </tr>

                  {/* billingPeriods */}
                  <tr>
                    <td>
                      <div>Ricorrenza abbonamento</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.billingPeriods)}</td>
                    ))}
                  </tr>
                  {/* includesAdsByPlan */}
                  <tr>
                    <td>
                      <div>Il piano include Ads?</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>
                        {s.includesAdsByPlan.map((plan, i) => {
                          return plan ? (
                            <p key={i}>
                              {s.planNames[i]}:{" "}
                              <strong>
                                <i
                                  className="fa-solid fa-check"
                                  style={{ color: "green" }}
                                ></i>
                              </strong>
                            </p>
                          ) : (
                            <p key={i}>
                              {s.planNames[i]}:{" "}
                              <strong>
                                <i
                                  className="fa-solid fa-x"
                                  style={{ color: "red" }}
                                ></i>
                              </strong>
                            </p>
                          );
                        })}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* FOLDER QUALITA */}
              <tr className="tr-spacer">
                <td colSpan={services.length + 1} />
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
                  {/* streamingQuality */}
                  <tr>
                    <td>
                      <div>Qualità streaming</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.streamingQuality)}</td>
                    ))}
                  </tr>
                  {/* hdrSupport */}
                  <tr>
                    <td>
                      <div>Supporto HDR</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.hdrSupport)}</td>
                    ))}
                  </tr>
                  {/* audioSupport */}
                  <tr>
                    <td>
                      <div>Supporto Audio</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.audioSupport)}</td>
                    ))}
                  </tr>
                  {/* supportedDevices */}
                  <tr>
                    <td>
                      <div>Dispositivi supportati</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.supportedDevices)}</td>
                    ))}
                  </tr>
                  {/* simultaneousStreamsMax */}
                  <tr>
                    <td>
                      <div>Schermi simultanei</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.simultaneousStreamsMax)}</td>
                    ))}
                  </tr>
                  {/* offlineDownloads */}
                  <tr>
                    <td>
                      <div>Download Offline</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>
                        {s.offlineDownloads ? (
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
                    ))}
                  </tr>
                </>
              )}

              {/* FOLDER GENERICHE */}
              <tr className="tr-spacer">
                <td colSpan={services.length + 1} />
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
                  {/* contentTypes */}
                  <tr>
                    <td>
                      <div>Contenuti principali</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.contentTypes)}</td>
                    ))}
                  </tr>
                  {/* topGenres */}
                  <tr>
                    <td>
                      <div>Generi più visti</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.topGenres)}</td>
                    ))}
                  </tr>
                  {/* originalContents */}
                  <tr>
                    <td>
                      <div>Contenuti originali</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>
                        {s.originalContents ? (
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
                    ))}
                  </tr>
                  {/* parentalControls */}
                  <tr>
                    <td>
                      <div>Filtro famiglia</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>
                        {s.parentalControls ? (
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
                    ))}
                  </tr>
                  {/* subCount */}
                  <tr>
                    <td>
                      <div>Numero di iscritti</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{s.subCount}</td>
                    ))}
                  </tr>
                  {/* monthlyWatchers */}
                  <tr>
                    <td>
                      <div>Visitatori mensili</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{renderList(s.monthlyWatchers)}</td>
                    ))}
                  </tr>
                  {/* lastUpdate */}
                  <tr>
                    <td>
                      <div>Ultimo Aggiornamento</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>
                        {dayjs(s.lastUpdated).format("DD/MM/YYYY")}
                      </td>
                    ))}
                  </tr>
                  {/* score */}
                  <tr>
                    <td>
                      <div>Score</div>
                    </td>
                    {services.map((s) => (
                      <td key={s.id}>{s.score}</td>
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h3>Aggiungi qualcosa per comparare i dettagli</h3>
          <Link to="/search">Clicca qui per tornare alla home page</Link>
        </div>
      )}
    </>
  );
}
