#Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .
COPY pnpm-lock.yaml .


RUN npm i -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

#Production stage
FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json .

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]
