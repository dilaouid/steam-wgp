FROM node:18

WORKDIR /app

COPY package.json ./

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

COPY . .

RUN pnpm exec tsc -p tsconfig.json

RUN pnpm install -g ts-node tsconfig-paths

CMD ["ts-node", "-r", "tsconfig-paths/register", "--transpile-only", "src/app.ts"]