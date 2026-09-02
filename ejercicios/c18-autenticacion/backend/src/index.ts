import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import libroRoutes from './routes/libro.routes';
import autorRoutes from './routes/autor.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);

app.use(errorHandler); // ← siempre último

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
