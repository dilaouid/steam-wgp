FROM node:18

WORKDIR /app

COPY package.json ./

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

COPY . .

RUN pnpm run build

RUN pnpm install -g ts-node tsconfig-paths

CMD ["pnpm", "start"]