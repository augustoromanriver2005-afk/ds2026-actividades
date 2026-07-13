# C14 - Fundamentos Backend: primer endpoint

Sitio de la librería (copiado de la Clase 13) + backend migrado a **TypeScript** con Express, siguiendo lo visto en la Clase 14.

- `frontend/`: sitio de la librería (copiado de la Clase 13, sin cambios).
- `backend/`: API en Express + TypeScript (`tsx watch`), con chequeo de conexión a PostgreSQL y el endpoint `GET /libros`.
- `docker-compose.yml`: levanta `api` (Node, con volume de `src` para hot reload) + `db` (PostgreSQL 16).

## Uso

```bash
# 1. preparar variables de entorno (ya incluidas para desarrollo local)
cp backend/.env.example backend/.env

# 2. levantar api + db (con build, para traer las nuevas dependencias de TS)
docker compose up --build

# 3. probar la API (navegador o backend/api.http con REST Client)
# http://localhost:3000                        -> mensaje de bienvenida
# http://localhost:3000/health                  -> estado de la API
# http://localhost:3000/health/db                -> estado de la conexión a la DB
# http://localhost:3000/libros                   -> catálogo hardcodeado
# http://localhost:3000/libros?disponible=true    -> filtrado por disponibilidad
# http://localhost:3000/autores                  -> autores hardcodeados

# 4. modo dev: tocar backend/src/index.ts y guardar -> tsx watch recarga solo,
#    sin necesidad de rebuildear la imagen

# 5. bajar todo
docker compose down
```
