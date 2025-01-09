FROM node:18

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN --mount=type=cache,id=s/pnpm-store-/root/.pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start"]