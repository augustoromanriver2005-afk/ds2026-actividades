# C15 - APIs REST: capas

Sitio de la librería (copiado de la Clase 14) + backend reorganizado en **capas** (`types/`, `services/`, `controllers/`, `routes/`), siguiendo lo visto en la Clase 15.

- `frontend/`: sitio de la librería (copiado de la Clase 14, sin cambios).
- `backend/`: API en Express + TypeScript, con dos recursos REST completos:
  - `GET|POST /api/libros`, `GET|PUT|DELETE /api/libros/:id`
  - `GET|POST /api/autores`, `GET|PUT|DELETE /api/autores/:id`
- `docker-compose.yml`: levanta `api` (Node, con volume de `src` para hot reload) + `db` (PostgreSQL 16).

## Estructura del backend

```
backend/src/
├── types/
│   ├── libro.types.ts       ← interface Libro
│   └── autor.types.ts       ← interface Autor
├── services/
│   ├── libro.service.ts     ← datos + lógica de libros (sin HTTP)
│   └── autor.service.ts     ← datos + lógica de autores (sin HTTP)
├── controllers/
│   ├── libro.controller.ts  ← HTTP ↔ service, elige el status code
│   └── autor.controller.ts  ← HTTP ↔ service, elige el status code
├── routes/
│   ├── libro.routes.ts      ← verbo + ruta → controller
│   └── autor.routes.ts      ← verbo + ruta → controller
└── index.ts                 ← sólo levanta el server y monta los dos routers
```

## Uso

```bash
# 1. preparar variables de entorno (ya incluidas para desarrollo local)
cp backend/.env.example backend/.env

# 2. levantar api + db
docker compose up --build

# 3. probar la API (navegador o backend/api.http con REST Client)
# http://localhost:3000/api/libros                    -> listar libros
# http://localhost:3000/api/libros?disponible=true     -> filtrado por disponibilidad
# http://localhost:3000/api/libros/1                   -> un libro
# http://localhost:3000/api/autores                    -> listar autores
# http://localhost:3000/api/autores/1                  -> un autor

# 4. modo dev: tocar cualquier archivo en backend/src/ y guardar -> tsx watch
#    recarga solo, sin necesidad de rebuildear la imagen

# 5. bajar todo
docker compose down
```

## Tabla de endpoints

### Libros

| Método | Ruta              | Body           | Éxito | Errores |
| ------ | ----------------- | -------------- | ----- | ------- |
| GET    | /api/libros        | —              | 200   | 500     |
| GET    | /api/libros/:id     | —              | 200   | 404     |
| POST   | /api/libros        | Libro sin id   | 201   | 500     |
| PUT    | /api/libros/:id     | Libro sin id   | 200   | 404     |
| DELETE | /api/libros/:id     | —              | 204   | 404     |

### Autores

| Método | Ruta               | Body           | Éxito | Errores |
| ------ | ------------------ | -------------- | ----- | ------- |
| GET    | /api/autores        | —              | 200   | 500     |
| GET    | /api/autores/:id     | —              | 200   | 404     |
| POST   | /api/autores        | Autor sin id   | 201   | 500     |
| PUT    | /api/autores/:id     | Autor sin id   | 200   | 404     |
| DELETE | /api/autores/:id     | —              | 204   | 404     |

Nota: los 400 (datos inválidos) todavía no se emiten — llegan en C17 con Zod.
