import { Autor } from '../types/autor.types';

const autores: Autor[] = [
  { id: 1, nombre: 'Miguel de Cervantes' },
  { id: 2, nombre: 'George Orwell' },
  { id: 3, nombre: 'Jane Austen' },
];

let proximoId = 4;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find((autor) => autor.id === id);
}

export function create(datos: Omit<Autor, 'id'>): Autor {
  const nuevo: Autor = { id: proximoId++, ...datos };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Autor, 'id'>): Autor | undefined {
  const autor = findById(id);
  if (!autor) return undefined;
  Object.assign(autor, datos);
  return autor;
}

export function remove(id: number): boolean {
  const index = autores.findIndex((autor) => autor.id === id);
  if (index === -1) return false;
  autores.splice(index, 1);
  return true;
}
