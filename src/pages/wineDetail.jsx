import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import WineDetailPairings from "../components/wineDetailPairings.jsx";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function WineDetail() {
  const { id } = useParams();
  const [wine, setWine] = useState(null);

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
        overflow: "hidden",
      }}
    >
      <div className="container my-4 py-5">
        <h1>{wine.title}</h1>
        <h5>{wine.description}</h5>
        <h6 className="text-muted">{wine.category}</h6>
        <p>
          <strong>Regione:</strong> {wine.region}, {wine.country}
        </p>
        <p>
          <strong>Alcol:</strong> {wine.alcohol}%
        </p>
        <WineDetailPairings wine={wine} />
        <p>
          <strong>Prezzo:</strong> €{wine.price}
        </p>
        <Link to="/list" className="btn btn-secondary mt-3">
          Torna alla lista
        </Link>
      </div>
    </div>
  );
}
