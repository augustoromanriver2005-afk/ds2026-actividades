import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Hero } from '../components/Hero';
import { LibroCard } from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export function Home() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

  return (
    <>
      <Hero />
      <Container>
        <h2 className="mb-5 text-center">Libros Destacados</h2>

        {loading && <Spinner animation="border" className="d-block mx-auto" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Row xs={1} md={2} lg={3} className="g-4">
            {(libros ?? []).map((libro) => (
              <Col key={libro.id}>
                <LibroCard {...libro} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
