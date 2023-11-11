import { fastifyCors } from '@fastify/cors'

export const corsPlugin = (fastify: any) => {
  return fastify.register(fastifyCors, {
    origin: (fastify.config.ORIGIN !== undefined) ? fastify.config.ORIGIN : 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });
};