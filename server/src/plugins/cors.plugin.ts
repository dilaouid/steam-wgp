import { fastifyCors } from '@fastify/cors'

export const corsPlugin = (fastify: any) => {
  fastify.log.info('Registering CORS plugin...');
  fastify.log.info('CORS origin: ' + fastify.config.ORIGIN);
  return fastify.register(fastifyCors, {
    origin: fastify.config.ORIGIN,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
};