import { Container, Row, Col, Button } from 'react-bootstrap';

export function Hero() {
  return (
    <section className="bg-primary text-white py-5 mb-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={8}>
            <h1 className="display-4 fw-bold">Bienvenido a Nuestra Librería</h1>
            <p className="lead">
              Descubre miles de libros para todas tus pasiones y aventuras literarias.
            </p>
            <Button variant="light" size="lg" href="#catalogo">
              Explorar Catálogo
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}