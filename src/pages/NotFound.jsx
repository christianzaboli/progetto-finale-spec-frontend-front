import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    const countdown = setTimeout(() => {
      navigate("/homepage");
    }, 3000);
    return () => clearTimeout(countdown);
  }, []);
  return (
    <div className="page">
      <h1>Errore 404, ti sei perso?</h1>
      <h3>
        Tra <span>3</span> secondi verrai riportato nella home.
      </h3>
    </div>
  );
}
