import { FastifyInstance } from 'fastify';
import { fastifyRateLimit } from '@fastify/rate-limit';

export const rateLimitPlugin = (fastify: FastifyInstance) => {
  return fastify.register(fastifyRateLimit, {
    max: fastify.config.NODE_ENV === 'production' ? 30 : 1000,
    timeWindow: '1 minute'
  });
}