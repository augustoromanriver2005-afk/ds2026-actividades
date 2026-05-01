// 1. Definimos la interface: le decimos a TS qué forma tienen los usuarios
interface Usuario {
  id: number
  name: string
  email: string
  phone: string
}

// 2. Función async que trae los usuarios de la API
//    Promise<Usuario[]> significa: "va a devolver, eventualmente, un array de Usuarios"
async function obtenerUsuarios(): Promise<Usuario[]> {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
  const usuarios: Usuario[] = await respuesta.json()
  return usuarios
}

// 3. Función principal que llama a obtenerUsuarios y muestra los datos
async function main() {
  try {
    const usuarios = await obtenerUsuarios()

    // Recorremos el array y mostramos cada usuario en consola
    for (const usuario of usuarios) {
      console.log(`Nombre: ${usuario.name} — Email: ${usuario.email}`)
    }

  } catch (error) {
    console.error("Ocurrió un error al obtener los usuarios:", error)
  }
}

// 4. Ejecutamos la función principal
main()