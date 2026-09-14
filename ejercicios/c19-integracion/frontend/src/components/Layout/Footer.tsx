import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>Sobre Nosotros</h5>
            <p>Tu librería online de confianza con miles de títulos disponibles.</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/catalogo" className="text-white text-decoration-none">Catálogo</Link></li>
              <li><Link to="/contacto" className="text-white text-decoration-none">Contacto</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contacto</h5>
            <p>Email: info@libreria.com</p>
            <p>Teléfono: +54 11 1234-5678</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center text-muted">
            <p>&copy; {currentYear} Librería React. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
