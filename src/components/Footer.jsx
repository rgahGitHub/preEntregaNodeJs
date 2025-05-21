import React, { useRef } from "react";
import CarritoDialog from "./CarritoDialog";
import { Container } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

function Footer() {

  const dialogRef = useRef();
  
    const abrirDialogo = () => {
      dialogRef.current?.abrirModal();
    };
  

  return (
    <footer className="bg-light border-top py-3 fixed-bottom">
      <Container className="d-flex justify-content-between align-items-center">
        <a href="#inicio" className="text-decoration-none text-dark" onClick={abrirDialogo}>
          Ver carrito
        </a>
        <a href="#" className="text-decoration-none text-dark">
          ir al inicio
        </a>
        <CarritoDialog ref={dialogRef} />
        <ul className="list-unstyled d-flex mb-0">
          <li className="ms-3">
            <a href="#" className="text-dark fs-4">
              <FaInstagram />
            </a>
          </li>
          <li className="ms-3">
            <a href="#" className="text-dark fs-4">
              <FaFacebook />
            </a>
          </li>
          <li className="ms-3">
            <a href="#" className="text-dark fs-4">
              <FaTwitter />
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}

export default Footer;
