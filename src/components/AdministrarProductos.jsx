import React, { useState, useEffect, useMemo } from "react";
import { Table, Button, Form, Container, Row, Col, Modal } from "react-bootstrap";
import {
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  borrarProducto,
} from "./IndexDBHelper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaPlus, FaSave } from "react-icons/fa";
import { Helmet } from "react-helmet";

const AdministrarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [imagenesAPI, setImagenesAPI] = useState([]);

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarProductos();
    cargarImagenesDesdeAPI();
  }, []);

  const cargarProductos = async () => {
    const prods = await obtenerProductos();
    setProductos(prods);
  };

  const cargarImagenesDesdeAPI = async () => {
    try {
      const respuesta = await fetch("https://fakestoreapi.com/products");
      const datos = await respuesta.json();
      const urls = datos.map((item) => item.image);
      setImagenesAPI(urls);
    } catch (error) {
      console.error("Error cargando imágenes del API:", error);
    }
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
      toast.error("Nombre y precio son obligatorios");
      return;
    }

    if (!validarPrecio(precio)) {
      toast.error("El precio debe ser un número mayor a 0");
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
        await actualizarProducto({ id: idEditando, ...productoData });
        toast.success("Producto actualizado");
      } else {
        await agregarProducto(productoData);
        toast.success("Producto agregado");
      }
      limpiarCampos();
      cargarProductos();
    } catch (error) {
      console.error("Error guardando producto:", error);
      toast.error("Hubo un error al guardar el producto");
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

  const confirmarEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarConfirmacion(true);
  };

  const eliminarProducto = async () => {
    if (!productoAEliminar) return;

    try {
      await borrarProducto(productoAEliminar.id);
      toast.success(`Producto "${productoAEliminar.nombre}" eliminado con éxito`);
      cargarProductos();
    } catch (error) {
      console.error("Error eliminando producto:", error);
      toast.error("Hubo un error al eliminar el producto");
    } finally {
      setMostrarConfirmacion(false);
      setProductoAEliminar(null);
    }
  };

  // Filtrar productos por búsqueda en nombre (puedes añadir categoría si la tienes)
  const productosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase();
    return productos.filter((prod) =>
      prod.nombre.toLowerCase().includes(texto)
    );
  }, [busqueda, productos]);

  return (
    <Container className="my-4" role="main">
      <Helmet>
        <title>Administrar Productos | Mi Tienda</title>
        <meta
          name="description"
          content="Editar y gestionar productos en la tienda"
        />
      </Helmet>

      <h2 className="mb-4 text-center" id="titulo-principal">
        Administrar Productos
      </h2>

      <Form onSubmit={handleSubmit} aria-labelledby="titulo-principal">
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
                aria-required="true"
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
                aria-required="true"
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
              <Form.Select
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                aria-label="Seleccionar URL de imagen"
              >
                <option value="">Seleccione una imagen</option>
                {imagenesAPI.map((url, index) => (
                  <option key={index} value={url}>
                    {url}
                  </option>
                ))}
              </Form.Select>
              {imagen && (
                <img
                  src={imagen}
                  alt="Previsualización"
                  style={{ maxWidth: "100%", maxHeight: "150px", marginTop: 10 }}
                />
              )}
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant={modoEdicion ? "warning" : "primary"}
          type="submit"
          className="mb-4"
          aria-label={modoEdicion ? "Actualizar producto" : "Agregar producto"}
        >
          {modoEdicion ? (
            <>
              <FaSave /> Actualizar Producto
            </>
          ) : (
            <>
              <FaPlus /> Agregar Producto
            </>
          )}
        </Button>{" "}
        {modoEdicion && (
          <Button
            variant="secondary"
            onClick={limpiarCampos}
            className="mb-4"
            aria-label="Cancelar edición"
          >
            Cancelar
          </Button>
        )}
      </Form>

      {/* Barra de búsqueda */}
      <Form.Group controlId="busqueda" className="mb-3">
        <Form.Control
          type="search"
          placeholder="Buscar producto por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar productos"
        />
      </Form.Group>

      <h4>Lista de Productos</h4>
      {productosFiltrados.length === 0 ? (
        <p>No se encontraron productos que coincidan.</p>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          aria-labelledby="titulo-principal"
          role="table"
        >
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
            {productosFiltrados.map((prod) => (
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
                      style={{ maxWidth: 100, maxHeight: 60, objectFit: "contain" }}
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
                    aria-label={`Editar producto ${prod.nombre}`}
                  >
                    <FaEdit /> Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => confirmarEliminacion(prod)}
                    aria-label={`Eliminar producto ${prod.nombre}`}
                  >
                    <FaTrash /> Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal de confirmación */}
      <Modal
        show={mostrarConfirmacion}
        onHide={() => setMostrarConfirmacion(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el producto{" "}
          <strong>{productoAEliminar?.nombre}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setMostrarConfirmacion(false)}
            aria-label="Cancelar eliminación"
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={eliminarProducto}
            aria-label="Confirmar eliminación"
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toastify container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Container>
  );
};

export default AdministrarProductos;