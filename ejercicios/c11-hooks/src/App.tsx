import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { Contacto } from './pages/Contacto';
import { LibroDetalle } from './pages/LibroDetalle';
import { LibroNuevo } from './pages/LibroNuevo';
import { librosIniciales } from './data/libros';
import type { Libro } from './types/libro';
import './App.css';

function App() {
  const [libros, setLibros] = useState<Libro[]>(librosIniciales);

  const agregarLibro = (nuevo: Libro) => setLibros([...libros, nuevo]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home libros={libros} />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
      </Routes>
    </Layout>
  );
}

export default App;
