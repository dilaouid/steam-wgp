FROM node:18

WORKDIR /app

RUN npm install -g pnpm

COPY . /app/

RUN --mount=type=cache,id=node_modules,target=/app/node_modules/.cache pnpm install && pnpm run build

CMD ["pnpm", "run", "start"]