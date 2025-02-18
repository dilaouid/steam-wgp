FROM node:18
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN corepack enable && corepack prepare pnpm@9.15.3 --activate
RUN pnpm install
COPY . .
RUN pnpm run build
RUN pnpm add -D ts-node tsconfig-paths
CMD ["pnpm", "start"]
