import { Container, Row, Col } from 'react-bootstrap';
import { Hero } from '../components/Hero';
import { LibroCard } from '../components/LibroCard';
import type { Libro } from '../types/libro';

interface HomeProps {
  libros: Libro[];
}

export function Home({ libros }: HomeProps) {
  return (
    <>
      <Hero />
      <Container>
        <h2 className="mb-5 text-center">Libros Destacados</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {libros.map((libro) => (
            <Col key={libro.id}>
              <LibroCard {...libro} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
