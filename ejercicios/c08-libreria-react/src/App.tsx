import { Container, Row, Col } from 'react-bootstrap';
import { NavbarComponent } from './components/Navbar';
import { Hero } from './components/Hero';
import { LibroCard } from './components/LibroCard';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  const libros = [
    {
      id: 1,
      titulo: 'El Quijote',
      autor: 'Miguel de Cervantes',
      precio: 25.99,
      imagen: 'https://via.placeholder.com/300x400?text=El+Quijote',
      descripcion: 'Una obra maestra de la literatura española que narra las aventuras de Don Quijote.',
    },
    {
      id: 2,
      titulo: '1984',
      autor: 'George Orwell',
      precio: 19.99,
      imagen: 'https://via.placeholder.com/300x400?text=1984',
      descripcion: 'Una novela distópica que explora temas de control totalitario y vigilancia.',
    },
    {
      id: 3,
      titulo: 'Orgullo y Prejuicio',
      autor: 'Jane Austen',
      precio: 22.99,
      imagen: 'https://via.placeholder.com/300x400?text=Orgullo+y+Prejuicio',
      descripcion: 'Una historia clásica de amor y sociedad en la Inglaterra del siglo XIX.',
    },
    {
      id: 4,
      titulo: 'El Gran Gatsby',
      autor: 'F. Scott Fitzgerald',
      precio: 21.99,
      imagen: 'https://via.placeholder.com/300x400?text=El+Gran+Gatsby',
      descripcion: 'Una novela que captura el glamour y la decadencia de los felices años 20.',
    },
    {
      id: 5,
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      precio: 24.99,
      imagen: 'https://via.placeholder.com/300x400?text=Cien+años+de+soledad',
      descripcion: 'Una obra maestra del realismo mágico que narra varias generaciones de una familia.',
    },
    {
      id: 6,
      titulo: 'Crimen y Castigo',
      autor: 'Fiódor Dostoievski',
      precio: 26.99,
      imagen: 'https://via.placeholder.com/300x400?text=Crimen+y+Castigo',
      descripcion: 'Una novela psicológica que explora la culpa, la redención y la moral.',
    },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <Hero />
      <main className="flex-grow-1 mb-5">
        <Container>
          <h2 className="mb-5 text-center">Libros Destacados</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {libros.map((libro) => (
              <Col key={libro.id}>
                <LibroCard
                  titulo={libro.titulo}
                  autor={libro.autor}
                  precio={libro.precio}
                  imagen={libro.imagen}
                  descripcion={libro.descripcion}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;