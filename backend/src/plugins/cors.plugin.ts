import { fastifyCors } from '@fastify/cors'

export const corsPlugin = (fastify: any) => {
    return fastify.register(fastifyCors, {
        origin: fastify.config.origin,
        methods: ['GET', 'PUT', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    });
};