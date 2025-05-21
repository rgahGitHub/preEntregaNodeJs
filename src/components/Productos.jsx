import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Card, Button } from 'react-bootstrap';

function Productos() {
  const dialogRef = useRef();
  const abrirDialogo = () => {
    dialogRef.current?.abrirModal();
  };

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("usuario", "nombre de usuario capturado en login");

    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const serviciosAdaptados = data.map((item) => ({
          serviceID: item.id,
          nombre: item.title,
          descripcion: item.description,
          precio: `$${item.price}`,
          imagen: item.image
        }));
        setPosts(serviciosAdaptados);
      })
      .catch((error) => {
        console.log("Error al cargar datos:", error);
      });
  }, []);

  const comprar = (serviceID) => {
    const servicio = posts.find((post) => post.serviceID === serviceID);

    if (!servicio) {
      alert("Producto no encontrado");
      return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = {
      id: serviceID,
      nombreproducto: servicio.nombre,
      precio: servicio.precio,
      imagen: servicio.imagen,
      cantidad: 1,
    };

    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
      title: "¡Buen trabajo!",
      text: "Usted agregó un producto al carrito!",
      icon: "success"
    });
  };

  return (
    <div className="container my-5">
      <h2 id="servicios" className="text-center mb-4">Catálogo de Productos</h2>
<section>
  <div className="row">
    {posts.map((post) => (
      <div key={post.serviceID} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <Card className="h-100 shadow-sm">
          <Card.Img
            variant="top"
            src={post.imagen}
            alt={post.nombre}
            style={{ objectFit: "cover", height: "180px" }}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title className="fs-6">{post.nombre}</Card.Title>
            <Card.Text style={{ fontSize: "0.85rem", flexGrow: 1 }}>
              {post.descripcion}
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="fw-bold">{post.precio}</span>
              <Button
                variant="outline-primary"
                size="sm"
                className="px-2 py-1"
                style={{ whiteSpace: "nowrap", fontSize: "0.8rem" }}
                onClick={() => comprar(post.serviceID)}
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

export default Productos;
