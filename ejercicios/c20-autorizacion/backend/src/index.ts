import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import libroRoutes from './routes/libro.routes';
import autorRoutes from './routes/autor.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
const port = process.env.PORT || 3000;

// origin como lista (no "*"): sólo el front declarado en FRONTEND_URL puede leer las respuestas.
const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? 'http://localhost:5173'],
};
app.use(cors(corsOptions)); // ← 1º, ANTES de json() y de las rutas
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);

// 404 en JSON: sin esto, una ruta inexistente devuelve HTML y res.json() explota en el front
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler); // ← siempre último

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
