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

app.get('/', (req, res) => {
  res.json({ message: 'API de la Librería funcionando' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/health/db', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ db: 'ok' });
  } catch (err) {
    res.status(500).json({ db: 'error', message: err.message });
  }
});

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
