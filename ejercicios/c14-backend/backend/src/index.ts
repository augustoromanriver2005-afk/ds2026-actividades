import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  descripcion: string;
  disponible: boolean;
}

interface Autor {
  id: number;
  nombre: string;
}

const libros: Libro[] = [
  {
    id: 1,
    titulo: 'El Quijote',
    autor: 'Miguel de Cervantes',
    precio: 25.99,
    imagen: 'https://via.placeholder.com/300x400?text=El+Quijote',
    descripcion: 'Una obra maestra de la literatura española que narra las aventuras de Don Quijote.',
    disponible: true,
  },
  {
    id: 2,
    titulo: '1984',
    autor: 'George Orwell',
    precio: 19.99,
    imagen: 'https://via.placeholder.com/300x400?text=1984',
    descripcion: 'Una novela distópica que explora temas de control totalitario y vigilancia.',
    disponible: true,
  },
  {
    id: 3,
    titulo: 'Orgullo y Prejuicio',
    autor: 'Jane Austen',
    precio: 22.99,
    imagen: 'https://via.placeholder.com/300x400?text=Orgullo+y+Prejuicio',
    descripcion: 'Una historia clásica de amor y sociedad en la Inglaterra del siglo XIX.',
    disponible: true,
  },
  {
    id: 4,
    titulo: 'El Gran Gatsby',
    autor: 'F. Scott Fitzgerald',
    precio: 21.99,
    imagen: 'https://via.placeholder.com/300x400?text=El+Gran+Gatsby',
    descripcion: 'Una novela que captura el glamour y la decadencia de los felices años 20.',
    disponible: true,
  },
  {
    id: 5,
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    precio: 24.99,
    imagen: 'https://via.placeholder.com/300x400?text=Cien+años+de+soledad',
    descripcion: 'Una obra maestra del realismo mágico que narra varias generaciones de una familia.',
    disponible: true,
  },
  {
    id: 6,
    titulo: 'Crimen y Castigo',
    autor: 'Fiódor Dostoievski',
    precio: 26.99,
    imagen: 'https://via.placeholder.com/300x400?text=Crimen+y+Castigo',
    descripcion: 'Una novela psicológica que explora la culpa, la redención y la moral.',
    disponible: false,
  },
];

const autores: Autor[] = [
  { id: 1, nombre: 'Miguel de Cervantes' },
  { id: 2, nombre: 'George Orwell' },
  { id: 3, nombre: 'Jane Austen' },
];

app.get('/', (_req, res) => {
  res.json({ message: 'API de la Librería funcionando' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/health/db', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ db: 'ok' });
  } catch (err) {
    res.status(500).json({ db: 'error', message: (err as Error).message });
  }
});

app.get('/libros', (req, res) => {
  const { disponible } = req.query;

  if (disponible === undefined) {
    res.json(libros);
    return;
  }

  const disponibles = libros.filter((libro) => libro.disponible === (disponible === 'true'));
  res.json(disponibles);
});

app.get('/autores', (_req, res) => {
  res.json(autores);
});

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
