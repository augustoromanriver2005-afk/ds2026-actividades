import { prisma } from '../src/config/prisma';

// Categorías y autores primero: los libros los referencian con connect.
const categorias = [
  { nombre: 'Novela' },
  { nombre: 'Distopía' },
  { nombre: 'Clásico' },
];

const autores = [
  { nombre: 'Miguel de Cervantes' },
  { nombre: 'George Orwell' },
  { nombre: 'Jane Austen' },
  { nombre: 'F. Scott Fitzgerald' },
  { nombre: 'Gabriel García Márquez' },
  { nombre: 'Fiódor Dostoievski' },
];

// Los mismos datos que vivían en el array del service de C15, sin id a mano
// (lo pone la base con @default(autoincrement())) y con connect en vez de texto libre.
const libros = [
  {
    titulo: 'El Quijote',
    autor: 'Miguel de Cervantes',
    precio: 25.99,
    imagen: 'https://via.placeholder.com/300x400?text=El+Quijote',
    descripcion: 'Una obra maestra de la literatura española que narra las aventuras de Don Quijote.',
    disponible: true,
    cats: ['Novela', 'Clásico'],
  },
  {
    titulo: '1984',
    autor: 'George Orwell',
    precio: 19.99,
    imagen: 'https://via.placeholder.com/300x400?text=1984',
    descripcion: 'Una novela distópica que explora temas de control totalitario y vigilancia.',
    disponible: true,
    cats: ['Distopía'],
  },
  {
    titulo: 'Orgullo y Prejuicio',
    autor: 'Jane Austen',
    precio: 22.99,
    imagen: 'https://via.placeholder.com/300x400?text=Orgullo+y+Prejuicio',
    descripcion: 'Una historia clásica de amor y sociedad en la Inglaterra del siglo XIX.',
    disponible: true,
    cats: ['Novela', 'Clásico'],
  },
  {
    titulo: 'El Gran Gatsby',
    autor: 'F. Scott Fitzgerald',
    precio: 21.99,
    imagen: 'https://via.placeholder.com/300x400?text=El+Gran+Gatsby',
    descripcion: 'Una novela que captura el glamour y la decadencia de los felices años 20.',
    disponible: true,
    cats: ['Novela'],
  },
  {
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    precio: 24.99,
    imagen: 'https://via.placeholder.com/300x400?text=Cien+años+de+soledad',
    descripcion: 'Una obra maestra del realismo mágico que narra varias generaciones de una familia.',
    disponible: true,
    cats: ['Novela', 'Clásico'],
  },
  {
    titulo: 'Crimen y Castigo',
    autor: 'Fiódor Dostoievski',
    precio: 26.99,
    imagen: 'https://via.placeholder.com/300x400?text=Crimen+y+Castigo',
    descripcion: 'Una novela psicológica que explora la culpa, la redención y la moral.',
    disponible: false,
    cats: ['Novela', 'Clásico'],
  },
];

async function main() {
  await prisma.autor.createMany({ data: autores, skipDuplicates: true });
  await prisma.categoria.createMany({ data: categorias, skipDuplicates: true });

  for (const { autor, cats, ...datos } of libros) {
    const existe = await prisma.libro.findFirst({ where: { titulo: datos.titulo } });
    if (existe) continue;
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map((nombre) => ({ nombre })) },
      },
    });
  }

  console.log(`Seed listo: ${libros.length} libros, ${autores.length} autores, ${categorias.length} categorías`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
