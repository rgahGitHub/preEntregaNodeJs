import React, { useRef } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import CarritoDialog from "./CarritoDialog";
import CarritoDialogIndexDB from "./CarritoDialogIndexDB";

import {
  FaShoppingCart,
  FaTools,
  FaAddressBook,
  FaUserShield,
  FaSignInAlt,
  FaHome,
  FaUser,
  FaLock
} from "react-icons/fa";
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const dialogRef = useRef();

  const abrirDialogo = () => {
    dialogRef.current?.abrirModal();
  };

  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';

  const cerrarSesion = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="sticky-top shadow-sm">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="d-flex align-items-center">
                <FaHome className="me-2" /> Inicio
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/servicios" className="d-flex align-items-center">
                <FaTools className="me-2" /> Servicios
              </Nav.Link> */}
              <Nav.Link as={Link} to="/productos" className="d-flex align-items-center">
                <FaTools className="me-2" /> Productos
              </Nav.Link>
              <Nav.Link as={Link} to="/contactanos" className="d-flex align-items-center">
                <FaAddressBook className="me-2" /> Contactanos
              </Nav.Link>
              {isAuth && (
                <>
                  <Nav.Link as={Link} to="/perfil/usuario123" className="d-flex align-items-center">
                    <FaUser className="me-2" /> Perfil
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin" className="d-flex align-items-center">
                    <FaLock className="me-2" /> Admin
                  </Nav.Link>
                </>
              )}
              {!isAuth ? (
                <Nav.Link as={Link} to="/login"><FaSignInAlt className="me-2" />Login</Nav.Link>
              ) : (
                <Button variant="outline-light" onClick={cerrarSesion}>Cerrar sesión</Button>
              )}            
            </Nav>

            <Button variant="primary" className="d-flex align-items-center" onClick={abrirDialogo}>
              <FaShoppingCart className="me-2" />
              Ver Carrito
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <CarritoDialog ref={dialogRef} /> */}
      <CarritoDialogIndexDB ref={dialogRef} />
    </>
  );
}

export default Navigation;
