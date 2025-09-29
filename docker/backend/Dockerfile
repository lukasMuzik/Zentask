FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY backend/ ./backend/
COPY @types/ ./@types/
COPY tsconfig.json ./

COPY backend/.env ./backend/.env

EXPOSE 3002

CMD ["npx","ts-node", "backend/server.ts"]