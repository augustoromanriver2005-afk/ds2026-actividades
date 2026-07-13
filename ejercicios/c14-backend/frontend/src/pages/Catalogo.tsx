import { useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LibroCard } from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

  useEffect(() => {
    document.title = libros ? `Catálogo (${libros.length})` : 'Catálogo';
  }, [libros]);

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="mb-0">Catálogo Completo</h2>
        <Link to="/libros/nuevo" className="btn btn-success">
          + Nuevo libro
        </Link>
      </div>

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
  );
}
