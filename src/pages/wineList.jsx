import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function WineList() {
  const [wines, setWines] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [sortOrder, setSortOrder] = useState("default"); // 👈 nuovo stato per l’ordinamento
  const [filteredWines, setFilteredWines] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setWines(data);
        setFilteredWines(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Errore nel caricamento dei vini.");
      });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const lowerSearch = search.toLowerCase();

      let filtered = wines.filter((wine) => {
        const matchTitle = wine.title.toLowerCase().includes(lowerSearch);
        const matchCategory =
          selectedCategory === "Tutti" || wine.category === selectedCategory;
        return matchTitle && matchCategory;
      });

      // 🔤 Ordinamento alfabetico
      if (sortOrder === "asc") {
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOrder === "desc") {
        filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
      }

      setFilteredWines(filtered);

      if (
        (search || selectedCategory !== "Tutti" || sortOrder !== "default") &&
        filtered.length === 0
      ) {
        setError("Nessun vino trovato con questi filtri.");
      } else {
        setError("");
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, selectedCategory, sortOrder, wines]);

  if (wines.length === 0)
    return <p className="text-center">Caricamento vini...</p>;

  // 🔍 Categorie uniche
  const categories = ["Tutti", ...new Set(wines.map((w) => w.category))];

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center">Lista Vini</h1>

      {/* 🔍 Ricerca, categoria e ordinamento */}
      <div className="row mb-4 justify-content-center g-2">
        <div className="col-12 col-md-4">
          <input
            type="text"
            placeholder="Cerca per titolo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-12 col-md-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-3">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="form-select"
          >
            <option value="default">Ordina per...</option>
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </div>
      </div>

      {/* ⚠️ Messaggio di errore */}
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {filteredWines.map((wine) => (
          <div
            key={wine.id || wine.title}
            className="col-12 col-sm-6 col-lg-4 mb-4"
          >
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{wine.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {wine.category}
                </h6>
                {wine.id ? (
                  <Link
                    to={`/wines/${wine.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    Dettagli
                  </Link>
                ) : (
                  <p>ID non disponibile</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
