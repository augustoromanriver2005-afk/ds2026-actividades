import type { Autor } from './autor';
import type { Categoria } from './categoria';

// GET /api/libros y GET /api/libros/:id: mismo shape base, el detalle suma categorias.
export type Libro = {
  id: number;
  titulo: string;
  autor: Autor;
  autorId: number;
  precio: number;
  imagen: string;
  descripcion: string;
  disponible: boolean;
};

export type LibroDetalle = Libro & {
  categorias: Categoria[];
};
