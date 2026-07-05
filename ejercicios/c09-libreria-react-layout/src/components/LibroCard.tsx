import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Libro } from '../types/libro';

export function LibroCard({ id, titulo, autor, precio, imagen, descripcion }: Libro) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <Card className="h-100 shadow-sm" style={{ transition: 'transform 0.3s ease' }}>
      <Card.Img
        variant="top"
        src={imagen}
        style={{ height: '300px', objectFit: 'cover' }}
        alt={titulo}
      />
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-muted">{autor}</Card.Text>
        <Card.Text>{descripcion}</Card.Text>
        <Card.Text className="text-primary fw-bold">${precio}</Card.Text>

        <div className="d-flex gap-2">
          <Link to={`/libros/${id}`} className="btn btn-primary flex-grow-1">
            Ver Detalles
          </Link>
          <Button
            variant="outline-danger"
            onClick={() => setLikes(likes + 1)}
          >
            ❤ {likes}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
