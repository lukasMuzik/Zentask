# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
COPY craco.config.js ./
COPY tsconfig.json ./
COPY babel.config.js ./

RUN npm ci

COPY src/ ./src/
COPY public/ ./public/
COPY @types/ ./@types/

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]