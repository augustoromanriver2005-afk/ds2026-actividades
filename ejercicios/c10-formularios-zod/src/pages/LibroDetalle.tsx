import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import type { Libro } from '../types/libro';

interface LibroDetalleProps {
  libros: Libro[];
}

export function LibroDetalle({ libros }: LibroDetalleProps) {
  const { id } = useParams<{ id: string }>();
  const libro = libros.find((l) => l.id === Number(id));

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
