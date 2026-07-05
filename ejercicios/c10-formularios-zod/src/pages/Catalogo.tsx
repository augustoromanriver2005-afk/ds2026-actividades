import { Container, Row, Col } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';
import { libros } from '../data/libros';

export function Catalogo() {
  return (
    <Container>
      <h2 className="mb-5 text-center">Catálogo Completo</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {libros.map((libro) => (
          <Col key={libro.id}>
            <LibroCard
              id={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              precio={libro.precio}
              imagen={libro.imagen}
              descripcion={libro.descripcion}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
