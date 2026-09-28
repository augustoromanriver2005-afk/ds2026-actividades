import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function SinPermiso() {
  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <Alert variant="warning">
        <Alert.Heading>No tenés permiso</Alert.Heading>
        <p>Tu cuenta no tiene el rol necesario para ver esta página.</p>
        <Link to="/catalogo" className="btn btn-outline-warning">
          Volver al catálogo
        </Link>
      </Alert>
    </Container>
  );
}
