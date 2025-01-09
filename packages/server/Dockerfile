FROM node:18

WORKDIR /app

# 1) Copier le package.json + lockfile localisés dans /packages/server
COPY package.json .
COPY pnpm-lock.yaml .

# 2) Installer PNPM + dépendances
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

# 3) Copier tout le reste (code source, tsconfig.json, etc.)
COPY . .

# 4) Builder (tsc + tsc-alias) via ton script "build"
RUN pnpm run build

# 5) (Optionnel) Installer ts-node et tsconfig-paths en global si tu veux
#    exécuter en TS pur dans le conteneur. 
#    Tu en as peut-être déjà besoin localement, donc c'est possiblement
#    déjà dans tes devDependencies.
RUN pnpm install -g ts-node tsconfig-paths

# 6) Lancement
CMD ["pnpm", "start"]