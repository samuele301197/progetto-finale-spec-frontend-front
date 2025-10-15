import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function WineList() {
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  const toggleFavorite = (wine) => {
    const newFavorites = isFavorite(wine.id)
      ? favorites.filter((f) => f.id !== wine.id)
      : [...favorites, wine];

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const toggleSelect = (wine) => {
    const alreadySelected = selectedForCompare.find((w) => w.id === wine.id);
    let newSelection;

    if (alreadySelected) {
      newSelection = selectedForCompare.filter((w) => w.id !== wine.id);
    } else if (selectedForCompare.length < 2) {
      newSelection = [...selectedForCompare, wine];
    } else {
      return;
    }

    setSelectedForCompare(newSelection);
    localStorage.setItem("winesToCompare", JSON.stringify(newSelection));
  };

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setWines(data);
        setFilteredWines(data);
      })
      .catch((err) => console.error("Errore nel caricamento:", err));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = wines.filter((wine) => {
        const matchTitle = wine.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchCategory =
          selectedCategory === "Tutti" || wine.category === selectedCategory;

        return matchTitle && matchCategory;
      });

      const sorted = [...filtered].sort((a, b) =>
        sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );

      setFilteredWines(sorted);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [search, selectedCategory, sortOrder, wines]);

  if (!wines.length) return <p className="text-center">Caricamento vini...</p>;

  const categories = ["Tutti", ...new Set(wines.map((w) => w.category))];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("/tela.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div className="container my-4">
        <h1 className="mb-4 text-center">Lista Vini</h1>

        <div className="row mb-4 g-2 justify-content-center">
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

          <div className="col-12 col-md-1 d-flex align-items-center justify-content-center">
            <span
              style={{ cursor: "pointer", fontSize: "1.5rem" }}
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
            >
              {sortOrder === "asc" ? (
                <i className="fa-solid fa-arrow-down"></i>
              ) : (
                <i className="fa-solid fa-arrow-up"></i>
              )}
            </span>
          </div>
        </div>

        <div className="row">
          {filteredWines.map((wine) => (
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

                  <div className="mt-2 d-flex align-items-center gap-2">
                    <span
                      style={{ cursor: "pointer", fontSize: "1.5rem" }}
                      onClick={() => toggleFavorite(wine)}
                      title={
                        isFavorite(wine.id)
                          ? "Rimuovi dai preferiti"
                          : "Aggiungi ai preferiti"
                      }
                    >
                      {isFavorite(wine.id) ? "♥️" : "🤍"}
                    </span>

                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                      onClick={() => toggleSelect(wine)}
                      title={
                        selectedForCompare.find((w) => w.id === wine.id)
                          ? "Rimuovi dal confronto"
                          : "Aggiungi al confronto"
                      }
                    >
                      {selectedForCompare.find((w) => w.id === wine.id)
                        ? "✔️"
                        : "🆚"}
                    </span>
                  </div>

                  <Link
                    to={`/wines/${wine.id}`}
                    className="btn btn-outline-light mt-auto"
                  >
                    Dettagli
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedForCompare.length > 0 && (
          <div
            className="position-fixed bottom-0 end-0 mb-4 me-4"
            style={{ zIndex: 1100 }}
          >
            <Link
              to="/comparatore"
              state={{ wines: selectedForCompare }}
              className="btn btn-success btn-lg shadow"
              style={{ borderRadius: "50px", padding: "0.75rem 1.5rem" }}
            >
              Vai al comparatore ({selectedForCompare.length})
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
