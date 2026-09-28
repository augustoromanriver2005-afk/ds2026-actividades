import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import { apiFetch } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import type { Autor } from '../types/autor';
import type { Libro } from '../types/libro';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro';

export function LibroNuevo() {
  const navigate = useNavigate();
  const { data: autores, loading: cargandoAutores } = useFetch<Autor[]>('/autores');

  const [form, setForm] = useState({
    titulo: '',
    autorId: '',
    precio: '',
    descripcion: '',
    disponible: true,
  });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorApi(null);

    const resultado = libroSchema.safeParse({ ...form, imagen: IMG_PLACEHOLDER });
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

    try {
      setEnviando(true);
      // El token lo agrega apiFetch solo. Sin token: 401. Logueado como CLIENTE: 403.
      await apiFetch<Libro>('/libros', {
        method: 'POST',
        body: JSON.stringify(resultado.data),
      });
      navigate('/catalogo');
    } catch (error) {
      setErrorApi(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Nuevo libro</h2>

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

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
          <Form.Select
            name="autorId"
            value={form.autorId}
            onChange={handleChange}
            isInvalid={!!errores.autorId}
            disabled={cargandoAutores}
          >
            <option value="">Elegí un autor</option>
            {(autores ?? []).map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errores.autorId}</Form.Control.Feedback>
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
          <Button type="submit" variant="primary" disabled={enviando}>
            {enviando ? 'Agregando...' : 'Agregar libro'}
          </Button>
          <Link to="/catalogo" className="btn btn-secondary">
            Cancelar
          </Link>
        </div>
      </Form>
    </Container>
  );
}
