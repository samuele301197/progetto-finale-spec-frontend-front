import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function ComparisonPage() {
  const location = useLocation();
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });
  const [toastMessage, setToastMessage] = useState("");

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  const toggleFavorite = (wine) => {
    const alreadyFavorite = isFavorite(wine.id);
    let updatedFavorites;

    if (alreadyFavorite) {
      updatedFavorites = favorites.filter((f) => f.id !== wine.id);
    } else {
      updatedFavorites = [...favorites, wine];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    const message = alreadyFavorite
      ? `${wine.title} rimosso dai preferiti`
      : `${wine.title} aggiunto ai preferiti`;
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2000);
  };

  useEffect(() => {
    const winesFromState = location.state?.wines;
    const winesFromStorage = localStorage.getItem("winesToCompare");
    const selectedWines = winesFromState?.length
      ? winesFromState
      : winesFromStorage
      ? JSON.parse(winesFromStorage)
      : [];

    if (selectedWines.length === 0) {
      setLoading(false);
      return;
    }

    Promise.all(
      selectedWines.map((w) =>
        fetch(`${BASE_URL}/${w.id}`)
          .then((res) => res.json())
          .then((data) => data.wine)
          .catch((err) => {
            console.error("Errore nel caricamento vino:", err);
            return null;
          })
      )
    ).then((results) => {
      setWines(results.filter(Boolean));
      setLoading(false);
    });
  }, [location.state]);

  const handleRemoveWine = (id) => {
    const updatedWines = wines.filter((wine) => wine.id !== id);
    setWines(updatedWines);
    localStorage.setItem("winesToCompare", JSON.stringify(updatedWines));
  };

  if (loading)
    return <p className="text-center mt-4 text-light">Caricamento vini...</p>;

  if (wines.length === 0)
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: 'url("/signature.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "auto",
        }}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center text-center"
          style={{ minHeight: "60vh" }}
        >
          <h2 className="text-muted mb-3">
            <i className="fa-solid fa-wine-glass"></i> Nessun vino da
            confrontare
          </h2>
          <Link to="/list" className="btn btn-secondary rounded-pill">
            Inizia il confronto!
          </Link>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#f1f1f1",
        overflow: "hidden",
      }}
    >
      <div className="container py-5">
        <div className="row mt-5 mb-3 align-items-stretch">
          {wines.map((wine) => (
            <div key={wine.id} className="col-md-6 mb-2 d-flex">
              <div
                className="card text-light bg-dark border-0 shadow-sm w-100 h-100 d-flex flex-column justify-content-between"
                style={{
                  borderRadius: "16px",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="position-relative">
                  {wine.image && (
                    <img
                      src={wine.image}
                      alt={wine.title}
                      className="card-img-top"
                      style={{
                        height: "250px",
                        objectFit: "cover",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                      }}
                    />
                  )}
                  <span
                    className="position-absolute top-0 end-0 m-3"
                    style={{
                      fontSize: "1.5rem",
                      color: isFavorite(wine.id) ? "red" : "#bbb",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleFavorite(wine)}
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

                <div className="card-body d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <h4 className="card-title mb-3">{wine.title}</h4>
                    <p className="mb-2">{wine.description}</p>
                    <p>
                      <strong>Categoria:</strong> {wine.category}
                    </p>
                    <p>
                      <strong>Regione:</strong> {wine.region}, {wine.country}
                    </p>
                    <p>
                      <strong>Anno:</strong> {wine.year}
                    </p>
                    <p>
                      <strong>Gradazione:</strong> {wine.alcohol}%
                    </p>
                    {wine.pairings?.length > 0 && (
                      <div className="my-3">
                        <strong>Abbinamenti:</strong>
                        <div>
                          {wine.pairings.map((pairing, i) => (
                            <span
                              key={i}
                              className="badge bg-secondary m-1"
                              style={{ fontSize: "0.9rem" }}
                            >
                              {pairing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <p>
                      <strong>Prezzo:</strong> {wine.price.toFixed(2)}€
                    </p>
                  </div>

                  <button
                    className="btn btn-danger btn-sm mt-3 align-self-start"
                    style={{
                      borderRadius: "20px",
                      padding: "6px 14px",
                    }}
                    onClick={() => handleRemoveWine(wine.id)}
                  >
                    <i className="fa-solid fa-trash me-1"></i> Rimuovi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/list" className="btn btn-outline-light rounded-pill px-4">
            Torna alla lista
          </Link>
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
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={() => setToastMessage("")}
              ></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
