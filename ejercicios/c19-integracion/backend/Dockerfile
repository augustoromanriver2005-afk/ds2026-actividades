# Imagen base: punto de partida mínimo con Node.js
FROM node:22-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo archivos de dependencias (aprovecha el cache de capas)
COPY package*.json ./

# bcrypt compila un binario nativo: hace falta la toolchain de compilación en alpine
RUN apk add --no-cache --virtual .build-deps python3 make g++ \
  && npm install \
  && apk del .build-deps

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que la app escucha
EXPOSE 3000

# Comando por defecto al iniciar el contenedor
CMD ["npm", "run", "dev"]
