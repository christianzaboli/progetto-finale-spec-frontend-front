import dayjs from "dayjs";
import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";

const renderList = (
  items,
  fallback = <span className="redTXT">Dato non disponibile</span>,
  formatter = (item) => item,
) => {
  if (!items?.length) return fallback;
  return items.map((item, i) => <p key={i}>{formatter(item)}</p>);
};

export default function DetailedTable({ service }) {
  const { removeFromCompare } = useGlobalContext();
  const [localizationGroup, setLocalizationGroup] = useState(true);
  const [plansGroup, setPlansGroup] = useState(true);
  const [qualityGroup, setQualityGroup] = useState(true);
  const [genericsGroup, setGenericsGroup] = useState(true);

  if (Array.isArray(service))
    return (
      <div className="table-scroll">
        <table>
          {/* Head */}
          <thead>
            {/* Titolo */}
            <tr>
              <td style={{ display: "table-row-group" }}></td>
              {service.map((s) => (
                <td key={s.id}>
                  <div className="title-table">
                    <div className="title-name-logo-table">
                      <img
                        className="page-logo-comparing"
                        src={s?.logoUrl}
                        alt={`${s.title.toLowerCase()}-logo`}
                      />
                      <Link to={`/services/${s.id}`}>{s.title}</Link>
                    </div>
                    <button onClick={() => removeFromCompare(s.id)}>X</button>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Sito web */}
            <tr>
              <td>
                <div>Sito Web</div>
              </td>
              {service.map((s) => (
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
              {service.map((s) => (
                <td key={s.id}>{s.category}</td>
              ))}
            </tr>

            {/* FOLDER LOCALIZZAZIONE */}
            <tr className="tr-spacer">
              <td colSpan={service.length + 1} />
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
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.countries)}</td>
                  ))}
                </tr>
                {/* uiLanguages */}
                <tr>
                  <td>
                    <div>Lingue d'interfaccia</div>
                  </td>
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.uiLanguages)}</td>
                  ))}
                </tr>
                {/* audioLanguages */}
                <tr>
                  <td>
                    <div>Lingue audio</div>
                  </td>
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.audioLanguages)}</td>
                  ))}
                </tr>
                {/* subtitleLanguages */}
                <tr>
                  <td>
                    <div>Lingue di sottotitoli</div>
                  </td>
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.subtitleLanguages)}</td>
                  ))}
                </tr>
              </>
            )}

            {/* FOLDER ABBONAMENTI */}
            <tr className="tr-spacer">
              <td colSpan={service.length + 1} />
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
                  {service.map((s) => (
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
                  {service.map((s) => (
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
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.avgAdsPerHour)}</td>
                  ))}
                </tr>

                <tr>
                  <td>
                    <div>Prezzo abbonamento mensile</div>
                  </td>
                  {service.map((s) => (
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
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.billingPeriods)}</td>
                  ))}
                </tr>
                {/* includesAdsByPlan */}
                <tr>
                  <td>
                    <div>Il piano include Ads?</div>
                  </td>
                  {service.map((s) => (
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
              <td colSpan={service.length + 1} />
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
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.streamingQuality)}</td>
                  ))}
                </tr>
                {/* hdrSupport */}
                <tr>
                  <td>
                    <div>Supporto HDR</div>
                  </td>
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.hdrSupport)}</td>
                  ))}
                </tr>
                {/* audioSupport */}
                <tr>
                  <td>
                    <div>Supporto Audio</div>
                  </td>
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.audioSupport)}</td>
                  ))}
                </tr>
                {/* supportedDevices */}
                <tr>
                  <td>
                    <div>Dispositivi supportati</div>
                  </td>
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.supportedDevices)}</td>
                  ))}
                </tr>
                {/* simultaneousStreamsMax */}
                <tr>
                  <td>
                    <div>Schermi simultanei</div>
                  </td>
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.simultaneousStreamsMax)}</td>
                  ))}
                </tr>
                {/* offlineDownloads */}
                <tr>
                  <td>
                    <div>Download Offline</div>
                  </td>
                  {service.map((s) => (
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
              <td colSpan={service.length + 1} />
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
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.contentTypes)}</td>
                  ))}
                </tr>
                {/* topGenres */}
                <tr>
                  <td>
                    <div>Generi più visti</div>
                  </td>
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.topGenres)}</td>
                  ))}
                </tr>
                {/* originalContents */}
                <tr>
                  <td>
                    <div>Contenuti originali</div>
                  </td>
                  {service.map((s) => (
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
                  {service.map((s) => (
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
                  {service.map((s) => (
                    <td key={s.id}>{s.subCount}</td>
                  ))}
                </tr>
                {/* monthlyWatchers */}
                <tr>
                  <td>
                    <div>Visitatori mensili</div>
                  </td>
                  {service.map((s) => (
                    <td key={s.id}>{renderList(s.monthlyWatchers)}</td>
                  ))}
                </tr>
                {/* lastUpdate */}
                <tr>
                  <td>
                    <div>Ultimo Aggiornamento</div>
                  </td>
                  {service.map((s) => (
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
                  {service.map((s) => (
                    <td key={s.id}>{s.score}</td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    );

  return (
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
                    <i className="fa-solid fa-x" style={{ color: "red" }}></i>
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
                    <i className="fa-solid fa-x" style={{ color: "red" }}></i>
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
                    <i className="fa-solid fa-x" style={{ color: "red" }}></i>
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
                    <i className="fa-solid fa-x" style={{ color: "red" }}></i>
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
                    <i className="fa-solid fa-x" style={{ color: "red" }}></i>
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
  );
}
