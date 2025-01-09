FROM node:18

WORKDIR /app

COPY pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN --mount=type=cache,target=/root/.pnpm-store pnpm fetch

COPY . .

RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --offline

RUN pnpm run build

CMD ["pnpm", "run", "start"]