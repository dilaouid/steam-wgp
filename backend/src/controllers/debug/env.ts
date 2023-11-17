import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance";

export const options: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          config: {
            type: 'object',
            properties: {
              HOST: { type: 'string' },
              PORT: { type: 'string' },
              ORIGIN: { type: 'string' },
              STEAM_API_KEY: { type: 'string' },
              STEAM_REDIRECT_URI: { type: 'string' },
              DATABASE_URL: { type: 'string' },
              NODE_ENV: { type: 'string' },
              SECRET_KEY: { type: 'string' },
              FRONT: { type: 'string' }
            }
          }
        }
      }
    }
  }
}

export async function getAllEnvVariables(request: FastifyRequest, reply: FastifyReply) {
  const fastify = request.server as FastifyInstance;

  reply.send({ config: fastify.config });
}