import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LibroCard } from '../components/LibroCard';
import type { Libro } from '../types/libro';

interface CatalogoProps {
  libros: Libro[];
}

export function Catalogo({ libros }: CatalogoProps) {
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="mb-0">Catálogo Completo</h2>
        <Link to="/libros/nuevo" className="btn btn-success">
          + Nuevo libro
        </Link>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {libros.map((libro) => (
          <Col key={libro.id}>
            <LibroCard {...libro} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
