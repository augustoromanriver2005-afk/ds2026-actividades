import { z } from 'zod';

// El login NO valida fortaleza de contraseña: eso es cosa del registro, no de entrar.
export const loginSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export type LoginValidado = z.infer<typeof loginSchema>;
