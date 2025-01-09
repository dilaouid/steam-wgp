FROM node:18

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

COPY . .

RUN ls -R src/domain/services

RUN pnpm run build

RUN pnpm install -g ts-node tsconfig-paths

# 6) Lancement
CMD ["pnpm", "start"]