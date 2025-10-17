import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav
      className="navbar bg-dark text-white shadow-sm fixed-top"
      style={{ zIndex: 1000 }}
    >
      <div className="container d-flex justify-content-between align-items-center py-2">
        <NavLink
          to="/"
          className="navbar-brand text-white text-decoration-none fw-bold"
        >
          WineFounder
        </NavLink>

        <div className="d-none d-md-flex gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link text-decoration-none ${
                isActive ? "text-secondary fw-bold" : "text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/list"
            className={({ isActive }) =>
              `nav-link text-decoration-none ${
                isActive ? "text-secondary fw-bold" : "text-white"
              }`
            }
          >
            Lista Vini
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `nav-link text-decoration-none ${
                isActive ? "text-secondary fw-bold" : "text-white"
              }`
            }
          >
            Preferiti
          </NavLink>

          <NavLink
            to="/comparatore"
            className={({ isActive }) =>
              `nav-link text-decoration-none ${
                isActive ? "text-secondary fw-bold" : "text-white"
              }`
            }
          >
            Comparatore
          </NavLink>
        </div>

        <div className="d-flex d-md-none gap-3">
          <NavLink
            to="/"
            title="Home"
            className={({ isActive }) =>
              `text-decoration-none ${
                isActive ? "text-secondary" : "text-white"
              }`
            }
          >
            <i className="fa-regular fa-house"></i>
          </NavLink>

          <NavLink
            to="/list"
            title="Lista Vini"
            className={({ isActive }) =>
              `text-decoration-none ${
                isActive ? "text-secondary" : "text-white"
              }`
            }
          >
            <i className="fa-solid fa-wine-glass"></i>
          </NavLink>

          <NavLink
            to="/favorites"
            title="Preferiti"
            className={({ isActive }) =>
              `text-decoration-none ${
                isActive ? "text-secondary" : "text-white"
              }`
            }
          >
            <i className="fa-regular fa-heart"></i>
          </NavLink>

          <NavLink
            to="/comparatore"
            title="Comparatore"
            className={({ isActive }) =>
              `text-decoration-none ${
                isActive ? "text-secondary" : "text-white"
              }`
            }
          >
            <i className="fa-solid fa-scale-balanced"></i>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
