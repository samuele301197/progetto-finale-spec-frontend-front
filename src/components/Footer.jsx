export default function Footer() {
  return (
    <footer
      className="bg-dark text-white text-center py-3 mt-auto"
      style={{ opacity: 0.95 }}
    >
      <p className="mb-0">
        © {new Date().getFullYear()} <strong>WineFounder</strong> — Tutti i
        diritti riservati
      </p>
    </footer>
  );
}
