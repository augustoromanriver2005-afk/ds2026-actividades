# C13 - Docker + Previa Backend

Entorno básico backend (`api` + `db`) con Docker Compose, siguiendo lo visto en la Clase 13.

- `frontend/`: sitio de la librería (copiado de la Clase 11).
- `backend/`: API mínima en Express con chequeo de conexión a PostgreSQL.
- `docker-compose.yml`: levanta `api` (Node) + `db` (PostgreSQL 16).

## Uso

```bash
# 1. preparar variables de entorno (ya incluidas para desarrollo local)
cp backend/.env.example backend/.env

# 2. levantar api + db
docker compose up

# 3. probar la API
# http://localhost:3000        -> mensaje de bienvenida
# http://localhost:3000/health -> estado de la API
# http://localhost:3000/health/db -> estado de la conexión a la DB

# 4. bajar todo
docker compose down
```
