FROM node:18

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN --mount=type=cache,id=pnpm-cache,target=/root/.pnpm-store pnpm install && pnpm run build

CMD ["pnpm", "run", "start"]