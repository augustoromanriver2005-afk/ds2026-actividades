import { z } from 'zod';

// Mismas reglas que backend/src/validations/libro.validation.ts: el front valida antes de mandar,
// pero quien decide es el back.
export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio').max(200),
  autorId: z.coerce.number().int().positive('Elegí un autor'),
  precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
  imagen: z.string().min(1, 'La imagen es obligatoria'),
  descripcion: z.string().trim().min(1, 'La descripción es obligatoria'),
  disponible: z.boolean(),
});

export type LibroValidado = z.infer<typeof libroSchema>;
