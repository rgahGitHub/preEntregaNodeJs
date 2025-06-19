import React, { useState, useEffect } from "react";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";
import {
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  borrarProducto,
} from "./IndexDBHelper";

const AdministrarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const prods = await obtenerProductos();
    setProductos(prods);
  };

  const limpiarCampos = () => {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setImagen("");
    setModoEdicion(false);
    setIdEditando(null);
  };

  const validarPrecio = (valor) => {
    return !isNaN(valor) && Number(valor) > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !precio.trim()) {
      alert("Nombre y precio son obligatorios");
      return;
    }

    if (!validarPrecio(precio)) {
      alert("El precio debe ser un número mayor a 0");
      return;
    }

    const productoData = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: precio.trim(),
      imagen: imagen.trim(),
    };

    try {
      if (modoEdicion) {
        // Actualizar producto existente (incluye id)
        await actualizarProducto({ id: idEditando, ...productoData });
      } else {
        // Agregar nuevo producto (NO enviar id para autoIncrement)
        await agregarProducto(productoData);
      }
      limpiarCampos();
      cargarProductos();
    } catch (error) {
      console.error("Error guardando producto:", error);
      alert("Hubo un error al guardar el producto.");
    }
  };

  const editarProducto = (producto) => {
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setImagen(producto.imagen);
    setModoEdicion(true);
    setIdEditando(producto.id);
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await borrarProducto(id);
        cargarProductos();
      } catch (error) {
        console.error("Error eliminando producto:", error);
        alert("Hubo un error al eliminar el producto.");
      }
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Administrar Productos</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="precio">
              <Form.Label>Precio *</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio en USD"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                min="0.01"
                step="0.01"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={8}>
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Descripción del producto"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="imagen">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant={modoEdicion ? "warning" : "primary"} type="submit" className="mb-4">
          {modoEdicion ? "Actualizar Producto" : "Agregar Producto"}
        </Button>{" "}
        {modoEdicion && (
          <Button variant="secondary" onClick={limpiarCampos} className="mb-4">
            Cancelar
          </Button>
        )}
      </Form>

      <h4>Lista de Productos</h4>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.precio}</td>
                <td>{prod.descripcion}</td>
                <td>
                  {prod.imagen ? (
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      style={{ maxWidth: "100px", maxHeight: "60px", objectFit: "contain" }}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => editarProducto(prod)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarProducto(prod.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdministrarProductos;