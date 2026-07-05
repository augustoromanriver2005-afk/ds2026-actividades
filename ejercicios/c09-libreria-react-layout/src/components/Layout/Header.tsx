import { Navbar, Nav, Container } from 'react-bootstrap';

export function Header() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="mb-4">
      <Container>
        <Navbar.Brand href="#" className="fw-bold">
          📚 Librería React
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#catalogo">Catálogo</Nav.Link>
          <Nav.Link href="#contacto">Contacto</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
