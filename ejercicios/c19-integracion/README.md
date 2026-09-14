# C16 - Persistencia de datos: PostgreSQL + Prisma

Sitio de la librería (copiado de la Clase 15) + el mismo backend en capas, pero con los
datos viviendo en **PostgreSQL** a través de **Prisma 7**, siguiendo lo visto en la Clase 16.

**El contrato de la API no cambió**: ni una ruta, ni un verbo, ni un status code.
Cambió lo que hay atrás. El `api.http` de C15 corre entero, tal cual. Eso es para qué
separamos en capas.

- `frontend/`: sitio de la librería (copiado de la Clase 15, sin cambios).
- `backend/`: API en Express + TypeScript + Prisma, con dos recursos REST completos:
  - `GET|POST /api/libros`, `GET|PUT|DELETE /api/libros/:id`
  - `GET|POST /api/autores`, `GET|PUT|DELETE /api/autores/:id`
- `docker-compose.yml`: levanta `api` (con volúmenes de `src/`, `prisma/` y
  `prisma.config.ts`) + `db` (PostgreSQL 16 con `healthcheck`).

## Qué cambió respecto de C15

| Antes (C15)                          | Ahora (C16)                                            |
| ------------------------------------ | ------------------------------------------------------ |
| Array en memoria + `proximoId`        | Tablas `Libro` y `Autor` en PostgreSQL                  |
| `interface Libro` escrita a mano      | Tipos generados por Prisma desde `schema.prisma`        |
| `findAll()` sincrónico                | `async findAll(): Promise<Libro[]>`                     |
| Controllers sincrónicos               | `async` + `await` + `try/catch` (500)                   |
| `Libro \| undefined`                  | `Libro \| null`                                         |
| Reiniciás el container y se pierde    | Los datos sobreviven en el volumen `pgdata`             |

## Estructura del backend

```
backend/
├── prisma.config.ts                  ← Prisma 7: dónde está el schema y la DATABASE_URL
├── prisma/
│   ├── schema.prisma                 ← fuente de verdad: model Libro y model Autor
│   ├── seed.ts                       ← datos iniciales, SIN id a mano
│   └── migrations/
│       ├── 20260816120000_init_libro_autor/
│       │   └── migration.sql         ← el SQL, commiteado
│       └── migration_lock.toml
└── src/
    ├── config/
    │   └── prisma.ts                 ← UNA instancia de PrismaClient (con adapter pg)
    ├── types/
    │   ├── libro.types.ts            ← re-exporta LibroModel del cliente generado
    │   └── autor.types.ts            ← re-exporta AutorModel del cliente generado
    ├── services/
    │   ├── libro.service.ts          ← Prisma + lógica (sin HTTP), async
    │   └── autor.service.ts          ← Prisma + lógica (sin HTTP), async
    ├── controllers/
    │   ├── libro.controller.ts       ← HTTP ↔ service, await + try/catch
    │   └── autor.controller.ts       ← HTTP ↔ service, await + try/catch
    ├── routes/
    │   ├── libro.routes.ts           ← verbo + ruta → controller
    │   └── autor.routes.ts           ← verbo + ruta → controller
    ├── generated/prisma/             ← cliente generado. NO va a Git
    └── index.ts                      ← sólo levanta el server y monta los dos routers
```

## Puesta en marcha

```bash
# 1. variables de entorno
cp backend/.env.example backend/.env     # y completar usuario / password

# 2. levantar api + db (el api espera a que la db diga healthy)
docker compose up -d --build
docker compose ps                        # db debe figurar healthy

# 3. crear las tablas (aplica la migración commiteada)
docker compose exec api npx prisma migrate deploy

# 4. generar el cliente TypeScript  ← comando APARTE
docker compose exec api npx prisma generate

# 5. cargar los datos iniciales (UNA sola vez: dos veces = datos duplicados)
docker compose exec api npx prisma db seed

# 6. probar la API con backend/api.http (REST Client) o el navegador
#    http://localhost:3000/api/libros
```

> Para volver a cero: `docker compose exec api npx prisma migrate reset -f`
> (borra la base y vuelve a aplicar las migraciones). Ojo: en Prisma 7.9.1 el `reset`
> **no** corre el seed solo, así que después hay que repetir el paso 5.

### Ver los datos

```bash
# Prisma Studio -> http://localhost:5555
docker compose exec api npx prisma studio --port 5555 --browser none

# o SQL crudo
docker compose exec db psql -U postgres -d libreria_db -c "\dt"
```

### Comprobar que ahora sí persiste

```bash
# crear un libro con el POST del api.http, después:
docker compose restart api
# volver a pedir GET /api/libros -> el libro que creaste sigue ahí
```

Ojo con los comandos de Docker:

| Comando                    | Qué pasa con tus datos                 |
| -------------------------- | -------------------------------------- |
| `docker compose restart`   | Siguen ahí                             |
| `docker compose down`      | Siguen ahí: el volumen no se toca      |
| `docker compose down -v`   | **Se borran**: la `-v` borra el volumen |

## Tabla de endpoints

### Libros

| Método | Ruta            | Body         | Éxito | Errores |
| ------ | --------------- | ------------ | ----- | ------- |
| GET    | /api/libros     | —            | 200   | 500     |
| GET    | /api/libros/:id | —            | 200   | 404     |
| POST   | /api/libros     | Libro sin id | 201   | 500     |
| PUT    | /api/libros/:id | Libro sin id | 200   | 404     |
| DELETE | /api/libros/:id | —            | 204   | 404     |

### Autores

| Método | Ruta             | Body         | Éxito | Errores |
| ------ | ---------------- | ------------ | ----- | ------- |
| GET    | /api/autores     | —            | 200   | 500     |
| GET    | /api/autores/:id | —            | 200   | 404     |
| POST   | /api/autores     | Autor sin id | 201   | 500     |
| PUT    | /api/autores/:id | Autor sin id | 200   | 404     |
| DELETE | /api/autores/:id | —            | 204   | 404     |

## Lo que falta, falta a propósito

| Pendiente                                    | Lo resuelve            |
| -------------------------------------------- | ---------------------- |
| `Libro.autor` es String, sin relación         | C17 · `@relation`      |
| POST sin `titulo` guarda basura               | C17 · Zod              |
| `/api/libros/abc` da 404 en vez de 400        | C17 · validación       |
| Diez `try/catch`, y todo error es 500         | C17 · middleware       |
| Dos autores con el mismo nombre dan 500, no 409 | C17 · errores Prisma  |
| Cualquiera puede borrar cualquier libro       | C18 · Auth con JWT     |
| El front sigue leyendo `libros.json`          | C19 · front ↔ back     |
