import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Modal, Button, Table } from "react-bootstrap";

const CarritoDialog = forwardRef((props, ref) => {
  const [carrito, setCarrito] = useState([]);
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    abrirModal() {
      const data = JSON.parse(localStorage.getItem("carrito")) || [];
      setCarrito(data);
      setShow(true);
    },
  }));

  const cerrarModal = () => {
    setShow(false);
  };

  const eliminar = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const calcularTotal = () =>
    carrito.reduce((acc, item) => acc + parseFloat(item.precio.replace("$", "")), 0);

  return (
    <Modal show={show} onHide={cerrarModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Carrito</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombreproducto}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.precio}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => eliminar(item.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <hr />
        <p className="fw-bold text-end">TOTAL: ${calcularTotal().toFixed(2)}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CarritoDialog;
