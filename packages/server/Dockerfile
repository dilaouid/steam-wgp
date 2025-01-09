FROM node:18

WORKDIR /app

COPY package.json ./

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["pnpm", "start"]