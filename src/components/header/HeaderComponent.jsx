import { Link } from "react-router-dom";
import logo from "../../assets/logo.ico";
import "./HeaderComponent.css";
export default function HeaderComponent() {
  return (
    <header className="header-component header">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-3 fixed-top">
        <Link className="navbar-brand" to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/dealerships">
                DEALERSHIPS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cars">
                CARS
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
