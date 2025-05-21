import Navigation from "./Navigation";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <div className="bg-white shadow-sm mb-5 position-relative">
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <img
          src="src/assets/img/logo.png"
          alt="Logo de la empresa"
          style={{ width: 100, height: 100, objectFit: "contain" }}
          loading="lazy"
        />
      </div>

      <div className="container py-5 text-center">
        <h1 className="display-4 fw-semibold text-primary mb-3" aria-label="Nombre de la empresa">
          Simple Solution Consulting Group
        </h1>
      </div>
    </div>
  );
};

export default Header;
