import { FastifyInstance } from "fastify";

import globalRouter from "./global.route";
import playerRouter from "./player.route";
import steamderRouter from "./steamder.route";
import authRouter from "./auth.route";
import debugRouter from "./debug.route";
import libraryRouter from "./library.route";
import dashboardRouter from "./dashboard.route";

export default async function routes(fastify: FastifyInstance) {
  if (fastify.config.NODE_ENV === "development")
    fastify.register(debugRouter, { prefix: "/debug" });
  fastify.register(globalRouter, { prefix: "/" });
  fastify.register(authRouter, { prefix: "/auth" });
  fastify.register(playerRouter, { prefix: "/players" });
  fastify.register(steamderRouter, { prefix: "/steamder" });
  fastify.register(libraryRouter, { prefix: "/library" });
  fastify.register(dashboardRouter, { prefix: "/dashboard" });
}