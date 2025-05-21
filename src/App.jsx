import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Servicios from './components/Servicios';
import Productos from './components/Productos';
import Footer from './components/Footer';
import Login from './paginas/Login';
import Inicio from './paginas/Inicio';
import Perfil from './paginas/Perfil';
import Navigation from "./components/Navigation";
import Administracion from './paginas/Administracion';
import RutaProtegida from './components/RutaProtegida';
import Contactanos from './components/Contactanos';


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/Contactanos" element={<Contactanos />} />
        <Route path="/perfil/:id" element={
          <RutaProtegida><Perfil /></RutaProtegida>
        } />
        <Route path="/admin" element={
          <RutaProtegida><Administracion /></RutaProtegida>
        } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
