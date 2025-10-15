import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function ComparisonPage() {
  const location = useLocation();
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center mt-4">Caricamento vini...</p>;

  if (wines.length === 0)
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: 'url("/signature.jpg")',
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
          <h2 className="text-muted mb-3">🍷 Nessun vino da confrontare</h2>
          <Link to="/list" className="btn btn-secondary">
            Torna alla lista
          </Link>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("/signature.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      <div className="container my-4">
        <h1 className="text-center mb-4">Confronto Vini</h1>

        <div className="row">
          {wines.map((wine) => (
            <div key={wine.id} className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                {wine.image && (
                  <img
                    src={wine.image}
                    alt={wine.title}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h4 className="card-title">{wine.title}</h4>
                  <p>
                    <strong>Categoria:</strong> {wine.category}
                  </p>
                  <p>
                    <strong>Prezzo:</strong> €{wine.price}
                  </p>
                  <p>
                    <strong>Anno:</strong> {wine.year}
                  </p>
                  <p>
                    <strong>Gradazione:</strong> {wine.alcohol}%
                  </p>
                  <p>
                    <strong>Descrizione:</strong> {wine.description}
                  </p>

                  {wine.pairings?.length > 0 && (
                    <div className="mt-3">
                      <strong>Abbinamenti consigliati:</strong>
                      <ul className="list-unstyled mt-2 mb-0">
                        {wine.pairings.map((pair, i) => (
                          <li key={i}>- {pair}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/" className="btn btn-secondary mt-3">
          Torna alla lista
        </Link>
      </div>
    </div>
  );
}
