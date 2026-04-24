// interface libro
interface libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

// array catalogo (estado en memoria)
let catalogo: libro[] = [
    {
        isbn: "1",
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        precio: 10,
        disponible: true,
        genero: "ficcion"
    },
    {
        isbn: "2",
        titulo: "1984",
        autor: "George Orwell",
        precio: 15,
        disponible: false,
        genero: "distopia"
    },
    {
        isbn: "3",
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        precio: 30,
        disponible: true
    }
];

// ================= FUNCIONES =================

// buscar por autor
function buscarPorAutor(autor: string): libro[] {
    return catalogo.filter(libro => 
        libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
}

// solo disponibles
function librosDisponibles(): libro[] {
    return catalogo.filter(libro => libro.disponible);
}

// precio promedio
function precioPromedio(libros: libro[]): number {
    if (libros.length === 0) return 0;

    let suma = 0;

    libros.forEach(libro => {
        suma += libro.precio;
    });

    return suma / libros.length;
}

// renderizar en el DOM
function renderizar(libros: libro[]): void {
    const ul = document.getElementById("listado") as HTMLUListElement;
    const stats = document.getElementById("stats") as HTMLParagraphElement;

    // limpiar
    ul.innerHTML = "";

    // cargar lista
    libros.forEach(libro => {
        const li = document.createElement("li");

        li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio} - ${libro.disponible ? "Disponible" : "No disponible"}`;

        ul.appendChild(li);
    });

    // stats
    const cantidad = libros.length;
    const promedio = precioPromedio(libros);

    stats.textContent = `Cantidad: ${cantidad} | Precio promedio: $${promedio}`;
}

// ================= EVENTOS =================

// filtrar
const botonFiltrar = document.getElementById("filtrar") as HTMLButtonElement;

botonFiltrar.addEventListener("click", () => {
    const input = document.getElementById("filtroAutor") as HTMLInputElement;
    const valor = input.value;

    const resultado = buscarPorAutor(valor);
    renderizar(resultado);
});

// solo disponibles
const botonDisponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;

botonDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});

// ver todos
const botonTodos = document.getElementById("mostrarTodos") as HTMLButtonElement;

botonTodos.addEventListener("click", () => {
    renderizar(catalogo);
});

// mostrar todo al cargar
renderizar(catalogo);
export {};