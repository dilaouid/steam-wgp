FROM node:18

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

COPY . .

RUN pnpm run build

RUN pnpm add -D ts-node tsconfig-paths

CMD ["pnpm", "start"]