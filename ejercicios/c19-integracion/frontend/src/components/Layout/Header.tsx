import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { borrarToken, obtenerToken } from '../../services/sesion';

export function Header() {
  const navigate = useNavigate();
  // Sin AuthContext todavía (próxima clase): esto no se re-renderiza solo al loguear/salir.
  const hayToken = !!obtenerToken();

  const handleLogout = () => {
    borrarToken();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          📚 Librería React
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
          <Nav.Link as={Link} to="/libros/nuevo">Nuevo libro</Nav.Link>
          <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          {hayToken ? (
            <Nav.Link onClick={handleLogout}>Salir</Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login">Ingresar</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
