// 1. Definimos la interface: le decimos a TS qué forma tienen los usuarios
// 1. Definimos la interface
interface Usuario {
  id: number
  name: string
  email: string
  phone: string
}

// 2. Función async que trae los usuarios de la API
async function obtenerUsuarios(): Promise<Usuario[]> {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
  const usuarios: Usuario[] = await respuesta.json()
  return usuarios
}

// 3. Función principal
async function main() {
  try {
    const usuarios = await obtenerUsuarios()

    for (const usuario of usuarios) {
      console.log(`Nombre: ${usuario.name} — Email: ${usuario.email}`)
    }

  } catch (error) {
    console.error("Ocurrió un error al obtener los usuarios:", error)
  }
}

// 4. Ejecutamos
main()