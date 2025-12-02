FROM node:22-alpine

WORKDIR /app

# Copiar solo archivos de dependencias primero para aprovechar caché de Docker
COPY rest-api/package.json rest-api/pnpm-lock.yaml ./

ENV CI=true
RUN npm install -g pnpm@8
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY rest-api ./

# Construir las aplicaciones
RUN pnpm run build && pnpm run build worker

CMD ["pnpm", "run", "start"]
