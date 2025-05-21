import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Contactanos = () => {
  return (
    <main className="py-4" style={{ padding: '1rem' }}>
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexWrap: 'wrap', // que se pueda acomodar en móvil
        }}
      >
        <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
          <h2 id="formulario">Contáctanos</h2>
          <Form action="https://formspree.io/f/mvgoraek" method="POST">
            <Form.Group className="mb-3" controlId="txtNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="txtNombre" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="txtApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="txtApellido" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="edad">
              <Form.Label>Edad</Form.Label>
              <Form.Control type="number" min="0" max="99" name="edad" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="txtEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="txtEmail"
                placeholder="email@dominio.com"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="txtMensaje">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="txtMensaje"
                placeholder="Mensaje..."
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Enviar
            </Button>
          </Form>
        </div>

        {/* Mapa con ancho fijo */}
        <div style={{ flex: '0 0 500px', maxWidth: '500px' }}>
          <h2 className="mb-3">Dirección</h2>
          <div style={{ width: '100%', height: '400px' }}>
            <iframe
              id="direccion"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211363.44872514962!2d-58.59947058236035!3d-34.61597898123234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2spr!4v1729391225894!5m2!1sen!2spr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contactanos;
