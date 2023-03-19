import { Link } from "react-router-dom";
import "./FooterComponent.css";

export default function FooterComponent() {
  return (
    <footer className="footer bg-dark text-lg-start text-light mb-0">
      <div className="text-center">
        <span>© 2023 Copyleft: </span>
        <Link className="text-light" to="#">
          vitalieb.com
        </Link>
      </div>
      <div className="text-center">
        <span>Very few rights reserved</span>
      </div>
    </footer>
  );
}
