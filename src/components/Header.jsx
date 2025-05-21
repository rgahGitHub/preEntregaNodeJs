import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <div className="bg-white shadow-sm mb-4">
      <div className="container py-4">
        <div className="row align-items-center text-center text-md-start">
          <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex justify-content-center justify-content-md-start">
            <img
              src="resources/images/logo.png"
              alt="Logo de la empresa"
              className="img-fluid"
              style={{ maxWidth: 100, height: "auto", objectFit: "contain" }}
              loading="lazy"
            />
          </div>
          <div className="col-12 col-md-10">
            <h1 className="h3 h-md-1 fw-semibold text-primary mb-0">
              Simple Solution Consulting Group
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;