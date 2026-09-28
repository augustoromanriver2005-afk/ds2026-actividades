import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const navigate = useNavigate();
  const { usuario, logout, tieneRol } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          📚 Librería React
        </Navbar.Brand>
        <Nav className="ms-auto align-items-lg-center">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
          {tieneRol('ADMIN') && (
            <Nav.Link as={Link} to="/libros/nuevo">Nuevo libro</Nav.Link>
          )}
          <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          {usuario && <Navbar.Text className="ms-lg-3">Hola, {usuario.nombre}</Navbar.Text>}
          {usuario ? (
            <Nav.Link onClick={handleLogout}>Salir</Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login">Ingresar</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
