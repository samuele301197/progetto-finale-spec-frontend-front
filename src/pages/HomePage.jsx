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
        overflow: "hidden",
      }}
    >
      <div className="container my-5">
        <section className="py-5 border-bottom">
          <h2 className="fw-bold mb-3 text-center">
            Trova il vino perfetto 🍷
          </h2>
          <p className="text-center fs-5">
            Con <strong>WineFounder</strong> è facile scoprire il vino ideale
            per ogni occasione: in base ai tuoi <strong>piatti</strong>, alla{" "}
            <strong>serata</strong> che stai vivendo e all'
            <strong>esperienza</strong> che vuoi assaporare.
          </p>
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
      </section>
    </div>
  );
}
