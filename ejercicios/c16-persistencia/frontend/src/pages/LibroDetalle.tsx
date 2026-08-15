import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const libro = (libros ?? []).find((l) => l.id === Number(id));

  if (!libro) {
    return (
      <Container>
        <h2>Libro no encontrado</h2>
        <Link to="/catalogo">Volver al catálogo</Link>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="g-4 align-items-start">
        <Col md={5}>
          <img src={libro.imagen} alt={libro.titulo} className="img-fluid rounded" />
        </Col>
        <Col md={7}>
          <h1>{libro.titulo}</h1>
          <h5 className="text-muted">{libro.autor}</h5>
          <p className="fs-4 text-primary fw-bold">${libro.precio}</p>
          <p>{libro.descripcion}</p>
          <Link to="/catalogo" className="btn btn-secondary">
            Volver al catálogo
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
