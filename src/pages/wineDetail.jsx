import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import WineDetailPairings from "../components/wineDetailPairings.jsx";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function WineDetail() {
  const { id } = useParams();
  const [wine, setWine] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });
  const [toastMessage, setToastMessage] = useState("");

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  const toggleFavorite = (wine) => {
    let updatedFavorites;
    if (isFavorite(wine.id)) {
      updatedFavorites = favorites.filter((f) => f.id !== wine.id);
      setToastMessage(`${wine.title} rimosso dai preferiti`);
    } else {
      updatedFavorites = [...favorites, wine];
      setToastMessage(`${wine.title} aggiunto ai preferiti`);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setTimeout(() => setToastMessage(""), 2000);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setWine(data.wine);
        else console.error(data.message);
      })
      .catch(console.error);
  }, [id]);

  if (!wine) return <p className="text-center">Caricamento vino...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("/details.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "auto",
      }}
    >
      <div className="container my-4 py-5 text-light">
        <h1 className="text-muted mb-0">{wine.title}</h1>
        <div className="text-muted">
          <h5>{wine.description}</h5>
          <h6>{wine.category}</h6>
          <p>
            <strong>Regione:</strong> {wine.region}, {wine.country}
          </p>
          <p>
            <strong>Alcol:</strong> {wine.alcohol}%
          </p>
          <WineDetailPairings wine={wine} />
          <p>
            <strong>Prezzo:</strong> {wine.price.toFixed(2)}€
          </p>
        </div>
        <div className="d-flex align-items-center gap-3 mb-3">
          <Link
            to="/list"
            className="btn btn-dark rounded-pill px-4"
            style={{ height: "fit-content" }}
          >
            Torna alla lista
          </Link>

          <span
            className="d-flex align-items-center justify-content-center"
            style={{
              cursor: "pointer",
              fontSize: "1.8rem",
              color: isFavorite(wine.id) ? "red" : "#696969ff",
            }}
            onClick={() => toggleFavorite(wine)}
            title={
              isFavorite(wine.id)
                ? "Rimuovi dai preferiti"
                : "Aggiungi ai preferiti"
            }
          >
            <i
              className={
                isFavorite(wine.id)
                  ? "fa-solid fa-heart"
                  : "fa-regular fa-heart"
              }
            ></i>
          </span>
        </div>

        {toastMessage && (
          <div
            className="toast show align-items-center text-bg-dark border-0 rounded-pill position-fixed bottom-0 end-0 m-3"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ zIndex: 1100 }}
          >
            <div className="d-flex">
              <div className="toast-body">{toastMessage}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToastMessage("")}
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
