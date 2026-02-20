import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Card from "../components/Card";

export default function Favorites() {
  const { favs, API_URL } = useGlobalContext();
  const [favoritesList, setFavoritesList] = useState([]);

  // fetching della lista dei preferiti tramite gli id salvati il localstorage
  async function getFavoritesList() {
    const promises = favs.map(async (id) => {
      const response = await fetch(`${API_URL}/services/${id}`);
      if (!response.ok)
        throw new Error(
          `Errore nel recupero del servizio preferito di id: ${id}`,
        );

      const obj = await response.json();
      return obj;
    });
    const result = await Promise.all(promises);
    const cleanRes = result.map((r) => r.service);
    return cleanRes;
  }

  useEffect(() => {
    if (favs.length === 0) {
      setFavoritesList([]);
      return;
    }
    getFavoritesList().then((res) => setFavoritesList(res));
  }, [favs]);

  return (
    <>
      <h1>Preferiti</h1>

      {favoritesList.length > 0 ? (
        <div className="favList">
          {favoritesList.map((f) => (
            <Card key={f.id} props={f} />
          ))}
        </div>
      ) : (
        <div>
          <p>Nessuno elemento aggiunto ai preferiti</p>
        </div>
      )}
    </>
  );
}
