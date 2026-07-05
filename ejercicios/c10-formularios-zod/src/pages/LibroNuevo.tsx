import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import type { Libro } from '../types/libro';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro';

interface LibroNuevoProps {
  onAgregar: (libro: Libro) => void;
}

export function LibroNuevo({ onAgregar }: LibroNuevoProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    precio: '',
    descripcion: '',
    disponible: true,
  });
  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resultado = libroSchema.safeParse(form);
    if (!resultado.success) {
      const nuevosErrores: Record<string, string> = {};
      for (const issue of resultado.error.issues) {
        const campo = String(issue.path[0]);
        if (!nuevosErrores[campo]) nuevosErrores[campo] = issue.message;
      }
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    onAgregar({
      id: Date.now(),
      ...resultado.data,
      imagen: IMG_PLACEHOLDER,
    });
    navigate('/catalogo');
  };

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Nuevo libro</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            isInvalid={!!errores.titulo}
          />
          <Form.Control.Feedback type="invalid">{errores.titulo}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            name="autor"
            value={form.autor}
            onChange={handleChange}
            isInvalid={!!errores.autor}
          />
          <Form.Control.Feedback type="invalid">{errores.autor}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            isInvalid={!!errores.precio}
          />
          <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            isInvalid={!!errores.descripcion}
          />
          <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
        </Form.Group>

        <Form.Check
          className="mb-3"
          label="Disponible"
          name="disponible"
          checked={form.disponible}
          onChange={handleChange}
        />

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">
            Agregar libro
          </Button>
          <Link to="/catalogo" className="btn btn-secondary">
            Cancelar
          </Link>
        </div>
      </Form>
    </Container>
  );
}
