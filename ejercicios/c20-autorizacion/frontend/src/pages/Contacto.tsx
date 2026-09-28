import { Container, Form, Button } from 'react-bootstrap';

export function Contacto() {
  return (
    <Container>
      <h2 className="mb-4 text-center">Contacto</h2>
      <Form className="mx-auto" style={{ maxWidth: '500px' }}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Tu nombre" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="tu@email.com" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Escribí tu mensaje" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}
