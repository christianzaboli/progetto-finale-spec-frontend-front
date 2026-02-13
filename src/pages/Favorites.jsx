import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Favorites() {
  const { favs } = useGlobalContext();
  const [favoritesList, setFavoritesList] = useState([]);

  // fetching della lista dei preferiti tramite gli id salvati il localstorage
  async function getFavoritesList() {
    const promises = favs.map((id) =>
      fetch(`http://localhost:3001/services/${id}`).then((res) => res.json()),
    );
    const result = await Promise.all(promises);
    const cleanRes = result.map((r) => r.service);
    return cleanRes;
  }

  useEffect(() => {
    if (favs.length === 0) return;
    getFavoritesList().then((res) => setFavoritesList(res));
  }, []);

  return (
    <div className="page">
      <h1>Pagina dei preferiti</h1>
      {favoritesList.length > 0 ? (
        favoritesList.map((f) => <p key={f.id}>{f.title}</p>)
      ) : (
        <div>
          <p>Nessuno elemento aggiunto ai preferiti</p>
        </div>
      )}
    </div>
  );
}
