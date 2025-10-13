import { useState } from "react";

export default function WineDetailPairings({ wine }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-3">
      <button
        className="btn btn-outline-secondary w-100 d-flex justify-content-between align-items-center"
        onClick={() => setOpen(!open)}
      >
        <span>Abbinamenti consigliati</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && wine.pairings && wine.pairings.length > 0 && (
        <ul className="list-group list-group-flush mt-2">
          {wine.pairings.map((pairing, index) => (
            <li key={index} className="list-group-item">
              {pairing}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
