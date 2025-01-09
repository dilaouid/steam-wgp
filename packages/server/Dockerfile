FROM node:18

WORKDIR /app

# Copy package.json first
COPY package.json ./

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install

COPY . .

ENV NODE_PATH=./dist

RUN pnpm tsc -p tsconfig.json && \
    pnpm tsc-alias -p tsconfig.json

CMD ["node", "dist/app.js"]