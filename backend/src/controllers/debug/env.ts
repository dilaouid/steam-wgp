// to see later (handler/router/prefixer) /!\ \\
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
              DATABASE_URL: { type: 'string' },
              NODE_ENV: { type: 'string' }
            }
          }
        }
      }
    }
  }
}

export default async function envRoutesController(fastify: FastifyInstance) {
  fastify.get('/', options, async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ config: fastify.config });
  });
}