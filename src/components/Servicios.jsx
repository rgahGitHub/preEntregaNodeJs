import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import '../App.css';

function Servicios() {

  const dialogRef = useRef();

  const abrirDialogo = () => {
    dialogRef.current?.abrirModal();
  };

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("usuario", "nombre de usuario capturado en login");

    fetch("/resources/json/data.json")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log("Error al cargar datos:", error);
      });
  }, []);

  const comprar = async (serviceID) => {
    let nombre = "";
    let precio = "";
    let imagen = "";

    try {
      const response = await fetch("/resources/json/data.json");
      const posts = await response.json();
      const servicio = posts.find((post) => post.serviceID === serviceID.toString());

      if (servicio) {
        nombre = servicio.nombre;
        precio = servicio.precio;
        imagen = servicio.imagen;
      } else {
        alert("Servicio no encontrado");
        return;
      }
    } catch (error) {
      console.error("Error al buscar el servicio:", error);
      return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = {
      id: serviceID,
      nombreproducto: nombre,
      precio: precio,
      imagen: imagen,
      cantidad: 1,
    };

    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
              title: "Buen trabajo!",
              text: "Usted agrego un servicio al carrito!",
              icon: "success"
            });
  };

  return (
  <div className="container my-5">
    <h2 id="servicios" className="text-center mb-4">Catalogo de Servicios</h2>
    <section>
      <div
        className="row"
        style={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          gap: "1rem"
        }}
      >
        {posts.map((post) => (
          <div
            key={post.serviceID}
            style={{ flex: "0 0 25%", maxWidth: "25%" }}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={post.imagen}
                alt={post.nombre}
                className="card-img-top"
                style={{ objectFit: "cover", height: "180px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{post.nombre}</h5>
                <p className="card-text flex-grow-1">{post.descripcion}</p>
                <div className="mt-3 d-flex justify-content-between align-items-center">
                  <span className="fw-bold">{post.precio}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => comprar(post.serviceID)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

}

export default Servicios;
