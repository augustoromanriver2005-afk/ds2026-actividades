import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import libroRoutes from './routes/libro.routes';
import autorRoutes from './routes/autor.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
