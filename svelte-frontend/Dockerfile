# Use an official Node runtime as a parent image
FROM node:22-alpine AS build

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm install

COPY . .
RUN pnpm run build

FROM node:22-alpine

WORKDIR /app
COPY --from=build /app .

EXPOSE 3000

# CMD ["node", "/app/build/index.js"]

CMD ["node", "./build/index.js"]
