import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Servicios from './components/Servicios';
//import Productos from './components/Productos';
import Productos from './components/ProductosIndexDB';
import Footer from './components/Footer';
import Login from './paginas/Login';
import Inicio from './paginas/Inicio';
import Perfil from './paginas/Perfil';
import Navigation from "./components/Navigation";
import Administracion from './paginas/Administracion';
import RutaProtegida from './components/RutaProtegida';
import Contactanos from './components/Contactanos';
import AdministrarProductos from './components/AdministrarProductos';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";


function App() {

<ToastContainer position="top-right" autoClose={3000} hideProgressBar />

  return (
    
    <BrowserRouter>
      <Header />
      <Navigation />
      <Helmet>
        <title>Mi Tienda en linea del curso de react</title>
        <meta name="description" content="Bienvenido a Mi Tienda en Línea" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/servicios" element={<Servicios />} /> */}
        <Route path="/productos" element={<Productos />} />
        <Route path="/Contactanos" element={<Contactanos />} />
        <Route path="/perfil/:id" element={
          <RutaProtegida><Perfil /></RutaProtegida>
        } />
        {/* <Route path="/admin" element={
          <RutaProtegida><Administracion /></RutaProtegida>
        } /> */}
        <Route path="/admin" element={
          <RutaProtegida><AdministrarProductos /></RutaProtegida>
        } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
