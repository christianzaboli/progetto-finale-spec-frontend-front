import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";

import DetailedTable from "../components/DetailedTable";

export default function Comparing() {
  // mounting lista dettagliata dei servizi da comparare
  const { getComparingList, compareIds, removeFromCompare } =
    useGlobalContext();

  const navigate = useNavigate();
  const [services, setServices] = useState(null);

  useEffect(() => {
    if (compareIds.length === 1) {
      navigate(`/services/${compareIds[0]}`);
      removeFromCompare(compareIds[0]);
      return;
    }
    compareIds.length > 0
      ? getComparingList(compareIds).then((res) => setServices(res))
      : setServices(null);
  }, [compareIds]);

  return (
    <>
      <h1>Comparatore</h1>
      {services ? (
        <DetailedTable service={services} />
      ) : (
        <div>
          <h3>Aggiungi qualcosa per comparare i dettagli</h3>
          <Link to="/search">Clicca qui per tornare alla ricerca</Link>
        </div>
      )}
    </>
  );
}
