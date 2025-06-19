import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Card, Button } from "react-bootstrap";
import { obtenerProductos as obtenerProductosDB } from "./IndexDBHelper";
import { guardarProductoEnCarrito } from "./IndexDBHelper";

function ProductosIndexDB() {
  const dialogRef = useRef();
  const abrirDialogo = () => {
    dialogRef.current?.abrirModal();
  };

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("usuario", "nombre de usuario capturado en login");

    const cargarProductos = async () => {
      const data = await obtenerProductosDB();
      setPosts(data);
    };

    cargarProductos();
  }, []);

  const comprar = async (serviceID) => {
    const servicio = posts.find((post) => post.id === serviceID);

    if (!servicio) {
      alert("Producto no encontrado");
      return;
    }

    const producto = {
      id: serviceID,
      nombreproducto: servicio.nombre,
      precio: servicio.precio,
      imagen: servicio.imagen,
      cantidad: 1,
    };

    await guardarProductoEnCarrito(producto);

    Swal.fire({
      title: "¡Buen trabajo!",
      text: "Usted agregó un producto al carrito!",
      icon: "success",
    });
  };

  return (
    <div className="container my-5">
      <h2 id="servicios" className="text-center mb-4">Catálogo de Productos</h2>
      <div className="text-end mb-3">
        <Button variant="secondary" size="sm" onClick={() => navigate("/admin")}>Administrar Productos</Button>
      </div>
      <section>
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={post.imagen}
                  alt={post.nombre}
                  style={{ objectFit: "cover", height: "180px" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6">{post.nombre}</Card.Title>
                  <Card.Text style={{ fontSize: "0.85rem", flexGrow: 1 }}>{post.descripcion}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-bold">{post.precio}</span>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="px-2 py-1"
                      style={{ whiteSpace: "nowrap", fontSize: "0.8rem" }}
                      onClick={() => comprar(post.id)}
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductosIndexDB;