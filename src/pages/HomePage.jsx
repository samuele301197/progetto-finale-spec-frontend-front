import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("/homeJumbo.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        color: "white",
        overflow: "auto",
      }}
    >
      <div className="container my-5">
        <section className="py-5 border-bottom border-dark">
          <h2 className="fw-bold mb-3 text-center">
            Trova il vino perfetto 🍷
          </h2>
          <p className="text-center fs-5">
            Con <strong>WineFounder</strong> è facile scoprire il vino ideale
            per ogni occasione: scegli i <strong>piatti</strong> da abbinare, la{" "}
            <strong>serata</strong> che vuoi vivere e l'
            <strong>esperienza</strong> che vuoi assaporare.
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/list" className="text-decoration-none">
              <button className="btn btn-dark px-4 py-2 rounded-pill shadow-sm">
                Scopri la Lista Vini
              </button>
            </Link>
          </div>
        </section>
      </div>

      <section className="py-5">
        <h2 className="fw-bold mb-3 text-center">
          Confronta i tuoi vini preferiti 🍇
        </h2>
        <p className="text-center fs-5">
          Non sai quale scegliere? Aggiungi i vini ai preferiti e confrontali
          per scoprire quale si adatta meglio ai tuoi gusti.
          <br />
          Ogni dettaglio — dal profumo all'abbinamento giusto — a colpo
          d'occhio!
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/comparatore" className="text-decoration-none">
            <button className="btn btn-dark px-4 py-2 rounded-pill shadow-sm">
              Vai al Comparatore
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
