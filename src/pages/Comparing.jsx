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
    fallback = "Dato non disponibile",
    formatter = (item) => item,
  ) => {
    if (!items?.length) return fallback;
    return items.map((item, i) => <p key={i}>{formatter(item)}</p>);
  };

  useEffect(() => {
    compareIds.length > 0
      ? getComparingList().then((res) => setServices(res))
      : setServices(null);
  }, [compareIds]);

  return (
    <>
      <div className="page">
        <h1>Comparing</h1>
        {services ? (
          <>
            <table>
              {/* Head */}
              <thead>
                {/* buttons gestionali */}
                <tr>
                  <td>
                    <div></div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>
                      <div>
                        <button onClick={() => removeFromCompare(s.id)}>
                          X
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Titolo */}
                <tr>
                  <td>
                    <div></div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>{s.title}</td>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {/* Categoria */}
                <tr>
                  <td>
                    <div>Categoria</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>{s.category}</td>
                  ))}
                </tr>
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
                {/* Disponibilita */}
                <tr>
                  <td>
                    <div>Disponibilita</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>
                      {s.countries.join(" ") ?? "Dato non disponibile"}
                    </td>
                  ))}
                </tr>
                {/* uiLanguages */}
                <tr>
                  <td>
                    <div>Lingue d'interfaccia</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>
                      {s.uiLanguages?.join(" ") ?? "Dato non disponibile"}
                    </td>
                  ))}
                </tr>
                {/* audioLanguages */}
                <tr>
                  <td>
                    <div>Lingue audio</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>
                      {s.audioLanguages?.join(" ") ?? "Dato non disponibile"}
                    </td>
                  ))}
                </tr>
                {/* subtitleLanguages */}
                <tr>
                  <td>
                    <div>Lingue di sottotitoli</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>
                      {s.subtitleLanguages?.join(" ") ?? "Dato non disponibile"}
                    </td>
                  ))}
                </tr>
                {/* hasAds */}
                <tr>
                  <td>
                    <div>Ci sono Ads?</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>{s.hasAds ? "Si" : "No"}</td>
                  ))}
                </tr>
                {/* hasAdTier */}
                <tr>
                  <td>
                    <div>Ci sono abbonamenti con Ads?</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>{s.hasAds ? "Si" : "No"}</td>
                  ))}
                </tr>
                {/* avgAdsPerHour */}
                <tr>
                  <td>
                    <div>Numero di Ads all'ora</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>
                      {s.avgAdsPerHour ?? "Dato non disponibile"}
                    </td>
                  ))}
                </tr>
                {/* planNames */}
                <tr>
                  <td>
                    <div>Abbonamenti</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>{renderList(s.planNames)}</td>
                  ))}
                </tr>
                {/* pricesMonthly */}
                <tr>
                  <td>
                    <div>Prezzo abbonamento mensile</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>
                      {renderList(
                        s.pricesMonthly,
                        "Dato non disponibile",
                        (plan) => `${plan}€`,
                      )}
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
                      {renderList(
                        s.includesAdsByPlan,
                        "Dato non disponibile",
                        (plan) => (plan ? "Si" : "No"),
                      )}
                    </td>
                  ))}
                </tr>
                {/* streamingQuality */}
                <tr>
                  <td>
                    <div>Qualita streaming</div>
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
                    <td key={s.id}>
                      {s.simultaneousStreamsMax ?? "Dato non disponibile"}
                    </td>
                  ))}
                </tr>
                {/* offlineDownloads */}
                <tr>
                  <td>
                    <div>Download Offline</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>{s.offlineDownloads ? "Si" : "No"}</td>
                  ))}
                </tr>
                {/* contentTypes */}
                <tr>
                  <td>
                    <div>Tipi di contenuto</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>{renderList(s.contentTypes)}</td>
                  ))}
                </tr>
                {/* topGenres */}
                <tr>
                  <td>
                    <div>Generi piu visti</div>
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
                    <td key={s.id}>{s.originalContents ? "Si" : "No"}</td>
                  ))}
                </tr>
                {/* parentalControls */}
                <tr>
                  <td>
                    <div>Filtro famiglia</div>
                  </td>
                  {services.map((s) => (
                    <td key={s.id}>{s.parentalControls ? "Si" : "No"}</td>
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
                    <td key={s.id}>
                      {s.monthlyWatchers ?? "Dato non disponibile"}
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
              </tbody>
            </table>
          </>
        ) : (
          <div>
            <h3>Aggiungi qualcosa per comparare i dettagli</h3>
            <Link to="/homepage">Cliccami per tornare alla Homepage</Link>
          </div>
        )}
      </div>
    </>
  );
}
