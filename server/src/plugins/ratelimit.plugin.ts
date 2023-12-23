import { FastifyInstance } from 'fastify';
import { fastifyRateLimit } from '@fastify/rate-limit';

export const rateLimitPlugin = (fastify: FastifyInstance) => {
  return fastify.register(fastifyRateLimit, {
    max: 30,
    timeWindow: '1 minute'
  });
}