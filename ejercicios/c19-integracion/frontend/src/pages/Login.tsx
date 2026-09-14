import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { apiFetch } from '../services/api';
import { guardarToken } from '../services/sesion';
import { loginSchema } from '../schemas/loginSchema';
import type { Sesion } from '../types/usuario';

export function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorApi(null);

    const resultado = loginSchema.safeParse(form);
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
      const sesion = await apiFetch<Sesion>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(resultado.data),
      });
      guardarToken(sesion.token);
      navigate('/catalogo');
    } catch (error) {
      // El mensaje real del back: "Credenciales inválidas", no un genérico inventado acá.
      setErrorApi(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Ingresar</h2>

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            isInvalid={!!errores.email}
          />
          <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            isInvalid={!!errores.password}
          />
          <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={enviando}>
          {enviando ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </Form>
    </Container>
  );
}
