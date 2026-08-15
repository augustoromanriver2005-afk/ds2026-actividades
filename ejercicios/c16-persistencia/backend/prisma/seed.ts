import { prisma } from '../src/config/prisma';

// Los mismos datos que vivían en el array del service de C15, SIN id:
// el id lo pone la base con @default(autoincrement()).
const libros = [
  {
    titulo: 'El Quijote',
    autor: 'Miguel de Cervantes',
    precio: 25.99,
    imagen: 'https://via.placeholder.com/300x400?text=El+Quijote',
    descripcion: 'Una obra maestra de la literatura española que narra las aventuras de Don Quijote.',
    disponible: true,
  },
  {
    titulo: '1984',
    autor: 'George Orwell',
    precio: 19.99,
    imagen: 'https://via.placeholder.com/300x400?text=1984',
    descripcion: 'Una novela distópica que explora temas de control totalitario y vigilancia.',
    disponible: true,
  },
  {
    titulo: 'Orgullo y Prejuicio',
    autor: 'Jane Austen',
    precio: 22.99,
    imagen: 'https://via.placeholder.com/300x400?text=Orgullo+y+Prejuicio',
    descripcion: 'Una historia clásica de amor y sociedad en la Inglaterra del siglo XIX.',
    disponible: true,
  },
  {
    titulo: 'El Gran Gatsby',
    autor: 'F. Scott Fitzgerald',
    precio: 21.99,
    imagen: 'https://via.placeholder.com/300x400?text=El+Gran+Gatsby',
    descripcion: 'Una novela que captura el glamour y la decadencia de los felices años 20.',
    disponible: true,
  },
  {
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    precio: 24.99,
    imagen: 'https://via.placeholder.com/300x400?text=Cien+años+de+soledad',
    descripcion: 'Una obra maestra del realismo mágico que narra varias generaciones de una familia.',
    disponible: true,
  },
  {
    titulo: 'Crimen y Castigo',
    autor: 'Fiódor Dostoievski',
    precio: 26.99,
    imagen: 'https://via.placeholder.com/300x400?text=Crimen+y+Castigo',
    descripcion: 'Una novela psicológica que explora la culpa, la redención y la moral.',
    disponible: false,
  },
];

const autores = [
  { nombre: 'Miguel de Cervantes' },
  { nombre: 'George Orwell' },
  { nombre: 'Jane Austen' },
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
  console.log(`Seed listo: ${libros.length} libros y ${autores.length} autores`);
}

main();
