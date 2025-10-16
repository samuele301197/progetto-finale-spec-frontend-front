import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav
      className="navbar bg-dark text-white shadow-sm fixed-top"
      style={{ zIndex: 1000 }}
    >
      <div className="container d-flex justify-content-between align-items-center py-2">
        <Link
          to="/"
          className="navbar-brand text-white text-decoration-none fw-bold"
        >
          WineFounder
        </Link>

        <div className="d-none d-md-flex gap-3">
          <Link to="/" className="nav-link text-white text-decoration-none">
            Home
          </Link>
          <Link to="/list" className="nav-link text-white text-decoration-none">
            Lista Vini
          </Link>
          <Link
            to="/favorites"
            className="nav-link text-white text-decoration-none"
          >
            Preferiti
          </Link>
          <Link
            to="/comparatore"
            className="nav-link text-white text-decoration-none"
          >
            Comparatore
          </Link>
        </div>

        <div className="d-flex d-md-none gap-3">
          <Link to="/" className="text-decoration-none text-white" title="Home">
            <i className="fa-regular fa-house"></i>
          </Link>
          <Link to="/list" className="text-decoration-none" title="Lista Vini">
            <i className="fa-solid fa-wine-glass text-white"></i>
          </Link>
          <Link
            to="/favorites"
            className="text-decoration-none"
            title="Preferiti"
          >
            <i className="fa-regular fa-heart text-white"></i>
          </Link>
          <Link
            to="/comparatore"
            className="text-decoration-none text-white"
            title="Comparatore"
          >
            <i className="fa-solid fa-scale-balanced text-white"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}
