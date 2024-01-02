import { fastifyCors } from '@fastify/cors'

export const corsPlugin = (fastify: any) => {
  return fastify.register(fastifyCors, {
    origin: fastify.config.ORIGIN,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
};