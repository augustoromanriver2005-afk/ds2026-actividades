// interface
interface libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

// estado en memoria
let catalogo: libro[] = [
    {
        isbn: "1",
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        precio: 10,
        disponible: true
    },
    {
        isbn: "2",
        titulo: "1984",
        autor: "George Orwell",
        precio: 15,
        disponible: false
    }
];

// ================= FUNCIONES =================

// agregar
function agregarLibro(libroNuevo: libro): void {
    catalogo.push(libroNuevo);
    renderizar(catalogo);
}

// eliminar
function eliminarLibro(isbn: string): void {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
}

// validar formulario
function validarFormulario(): libro | null {
    const tituloInput = document.getElementById("titulo") as HTMLInputElement;
    const autorInput = document.getElementById("autor") as HTMLInputElement;
    const precioInput = document.getElementById("precio") as HTMLInputElement;
    const generoInput = document.getElementById("genero") as HTMLInputElement;
    const disponibleInput = document.getElementById("disponible") as HTMLInputElement;

    const errorDiv = document.getElementById("errorForm") as HTMLDivElement;
    errorDiv.textContent = "";

    const titulo = tituloInput.value;
    const autor = autorInput.value;
    const precio = Number(precioInput.value);
    const genero = generoInput.value;
    const disponible = disponibleInput.checked;

    // validaciones
    if (titulo === "" || autor === "" || precio <= 0) {
        errorDiv.textContent = "Datos inválidos";
        return null;
    }

    const nuevoLibro: libro = {
        isbn: "AUTO-" + Date.now(),
        titulo: titulo,
        autor: autor,
        precio: precio,
        disponible: disponible,
        genero: genero
    };

    return nuevoLibro;
}

// ================= FUNCIONES DEL EJ 2 =================

function buscarPorAutor(autor: string): libro[] {
    return catalogo.filter(libro =>
        libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
}

function librosDisponibles(): libro[] {
    return catalogo.filter(libro => libro.disponible);
}

function precioPromedio(libros: libro[]): number {
    if (libros.length === 0) return 0;

    let suma = 0;
    libros.forEach(libro => suma += libro.precio);

    return suma / libros.length;
}

// renderizar
function renderizar(libros: libro[]): void {
    const ul = document.getElementById("listado") as HTMLUListElement;
    const stats = document.getElementById("stats") as HTMLParagraphElement;

    ul.innerHTML = "";

    libros.forEach(libro => {
        const li = document.createElement("li");

        li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio}`;

        // boton eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {
            eliminarLibro(libro.isbn);
        });

        li.appendChild(botonEliminar);
        ul.appendChild(li);
    });

    const cantidad = libros.length;
    const promedio = precioPromedio(libros);

    stats.textContent = `Cantidad: ${cantidad} | Promedio: $${promedio}`;
}

// ================= EVENTOS =================

// agregar
const botonAgregar = document.getElementById("agregar") as HTMLButtonElement;

botonAgregar.addEventListener("click", () => {
    const libro = validarFormulario();

    if (libro === null) return;

    agregarLibro(libro);

    // limpiar form
    (document.getElementById("titulo") as HTMLInputElement).value = "";
    (document.getElementById("autor") as HTMLInputElement).value = "";
    (document.getElementById("precio") as HTMLInputElement).value = "";
    (document.getElementById("genero") as HTMLInputElement).value = "";
    (document.getElementById("disponible") as HTMLInputElement).checked = false;
});

// filtros
(document.getElementById("filtrar") as HTMLButtonElement)
.addEventListener("click", () => {
    const valor = (document.getElementById("filtroAutor") as HTMLInputElement).value;
    renderizar(buscarPorAutor(valor));
});

(document.getElementById("mostrarDisponibles") as HTMLButtonElement)
.addEventListener("click", () => {
    renderizar(librosDisponibles());
});

(document.getElementById("mostrarTodos") as HTMLButtonElement)
.addEventListener("click", () => {
    renderizar(catalogo);
});

// inicial
renderizar(catalogo);