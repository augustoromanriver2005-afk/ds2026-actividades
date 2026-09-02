import { prisma } from '../config/prisma';
import { Prisma } from '../generated/prisma/client';
import type { AutorCreate, AutorUpdate } from '../validations/autor.validation';

export type AutorConLibros = Prisma.AutorGetPayload<{ include: { libros: true } }>;

export async function findAll(): Promise<AutorConLibros[]> {
  return prisma.autor.findMany({ orderBy: { id: 'asc' }, include: { libros: true } });
}

export async function findById(id: number): Promise<AutorConLibros | null> {
  return prisma.autor.findUnique({ where: { id }, include: { libros: true } });
}

export async function create(datos: AutorCreate): Promise<AutorConLibros> {
  return prisma.autor.create({ data: datos, include: { libros: true } });
}

export async function update(id: number, datos: AutorUpdate): Promise<AutorConLibros | null> {
  const existe = await prisma.autor.findUnique({ where: { id } });
  if (!existe) return null;
  return prisma.autor.update({ where: { id }, data: datos, include: { libros: true } });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.autor.findUnique({ where: { id } });
  if (!existe) return false;
  await prisma.autor.delete({ where: { id } });
  return true;
}
