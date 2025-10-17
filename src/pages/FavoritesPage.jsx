import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0)
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: 'url("/details-strong.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center text-center"
          style={{ minHeight: "60vh" }}
        >
          <h2 className="text-muted mb-3">
            <i className="fa-regular fa-heart"></i> Nessun preferito salvato
          </h2>
          <Link to="/list" className="btn btn-dark rounded-pill px-4">
            Torna alla lista
          </Link>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("/details-strong.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      <div className="container my-4">
        <h1 className="mb-4 text-center">I tuoi preferiti</h1>
        <div className="row">
          {favorites.map((wine) => (
            <div key={wine.id} className="col-12 col-sm-6 col-lg-4 mb-4">
              <div
                className="card h-100 text-white shadow-sm border-0"
                style={{
                  backgroundColor: "#1c1c1c",
                  borderRadius: "15px",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{wine.title}</h5>
                  <h6 className="card-subtitle mb-2">{wine.category}</h6>
                  <div className="mt-auto d-flex justify-content-between">
                    <Link
                      to={`/wines/${wine.id}`}
                      className="btn btn-outline-light mt-auto"
                    >
                      Dettagli
                    </Link>
                    <button
                      className="btn btn-danger btn-sm mt-3 align-self-start"
                      style={{
                        borderRadius: "20px",
                        padding: "6px 14px",
                      }}
                      onClick={() => removeFavorite(wine.id)}
                    >
                      <i className="fa-solid fa-trash me-1"></i>
                      Rimuovi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
