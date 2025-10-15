export default function WineDetailPairings({ wine }) {
  if (!wine.pairings || wine.pairings.length === 0) return null;

  return (
    <div className="mb-3">
      <p className="mb-2">
        <strong>Abbinamenti consigliati:</strong>
      </p>
      <div>
        {wine.pairings.map((pairing, i) => (
          <span
            key={i}
            className="badge bg-success me-1"
            style={{ fontSize: "0.9rem" }}
          >
            {pairing}
          </span>
        ))}
      </div>
    </div>
  );
}
