// 1. La misma interface del Ejercicio 1
interface Usuario {
  id: number
  name: string
  email: string
  phone: string
}

// 2. La misma función para traer usuarios
async function obtenerUsuarios(): Promise<Usuario[]> {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
  const usuarios: Usuario[] = await respuesta.json()
  return usuarios
}

// 3. Agarramos los elementos del HTML que vamos a manipular
//    El "as HTMLElement" le dice a TypeScript exactamente qué tipo de elemento es
const cargando = document.getElementById("cargando") as HTMLElement
const lista = document.getElementById("lista") as HTMLElement
const error = document.getElementById("error") as HTMLElement

// 4. Función principal
async function main() {
  try {
    // Mostramos "Cargando..." al arrancar (ya está visible en el HTML)
    cargando.style.display = "block"

    const usuarios = await obtenerUsuarios()

    // Cuando llegan los datos, ocultamos el "Cargando..."
    cargando.style.display = "none"

    // Construimos el HTML de la lista recorriendo el array
    // Acumulamos cada <li> en un string y lo insertamos de una sola vez
    let html = ""
    for (const usuario of usuarios) {
      html += `<li>${usuario.name} — ${usuario.email}</li>`
    }
    lista.innerHTML = html

  } catch (err) {
    // Si algo falla: ocultamos "Cargando..." y mostramos el error en rojo
    cargando.style.display = "none"
    error.style.display = "block"
    error.textContent = "Error al cargar los usuarios. Intentá de nuevo más tarde."
    console.error(err)
  }
}

main()
export{}