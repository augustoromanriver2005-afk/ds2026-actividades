// 1. Interface para cada libro
//    Los campos con ? son opcionales: pueden venir o no desde la API
interface LibroOL {
  title: string
  author_name?: string[]      // array de autores, puede no venir
  first_publish_year?: number // año de publicación, puede no venir
}

// 2. Interface para la respuesta completa de la API
//    La API no devuelve el array directamente, lo envuelve en un objeto con "docs"
interface RespuestaAPI {
  docs: LibroOL[]
}

// 3. Agarramos los elementos del HTML
const input = document.getElementById("inputBusqueda") as HTMLInputElement
const boton = document.getElementById("btnBuscar") as HTMLButtonElement
const resultados = document.getElementById("resultados") as HTMLElement
const cargando = document.getElementById("cargando") as HTMLElement
const error = document.getElementById("error") as HTMLElement

// 4. Función que busca libros en la API
async function buscarLibros(query: string): Promise<LibroOL[]> {
  // encodeURIComponent convierte espacios y caracteres especiales para la URL
  // Ej: "harry potter" → "harry%20potter"
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
  const respuesta = await fetch(url)
  const datos: RespuestaAPI = await respuesta.json()
  return datos.docs
}

// 5. Función que convierte un libro en HTML de tarjeta
function crearTarjeta(libro: LibroOL): string {
  // Si author_name existe, unimos el array con comas. Si no, mostramos "Autor desconocido"
  const autor = libro.author_name ? libro.author_name.join(", ") : "Autor desconocido"

  // Si first_publish_year existe lo mostramos, si no mostramos "Año desconocido"
  const anio = libro.first_publish_year ? libro.first_publish_year : "Año desconocido"

  return `
    <div class="tarjeta">
      <strong>${libro.title}</strong><br>
      Autor: ${autor}<br>
      Año: ${anio}
    </div>
  `
}

// 6. Evento click del botón
boton.addEventListener("click", async () => {
  const texto = input.value.trim() // .trim() elimina espacios al inicio y al final

  // Validación: si el input está vacío, mostramos error y no hacemos fetch
  if (texto === "") {
    error.textContent = "Por favor ingresá un término de búsqueda."
    error.style.display = "block"
    return // salimos de la función, no se ejecuta nada más
  }

  // Si hay texto, ocultamos errores anteriores y mostramos "Cargando..."
  error.style.display = "none"
  resultados.innerHTML = ""
  cargando.style.display = "block"

  try {
    const libros = await buscarLibros(texto)

    cargando.style.display = "none"

    // Tomamos solo los primeros 10 resultados con .slice(0, 10)
    const primerosDiez = libros.slice(0, 10)

    // Construimos el HTML de todas las tarjetas y lo insertamos de una vez
    let html = ""
    for (const libro of primerosDiez) {
      html += crearTarjeta(libro)
    }
    resultados.innerHTML = html

  } catch (err) {
    cargando.style.display = "none"
    error.textContent = "Error al buscar libros. Intentá de nuevo más tarde."
    error.style.display = "block"
    console.error(err)
  }
})