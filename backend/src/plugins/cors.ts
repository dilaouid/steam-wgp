import { fastifyCors, FastifyCorsOptions } from '@fastify/cors'

const setOptions = (origin: string): FastifyCorsOptions => {
    return {
        origin,
        methods: ['GET', 'PUT', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    };
};

export const corsPlugin = (fastify: any) => {
    return fastify.register(fastifyCors, setOptions(fastify.config.ORIGIN));
};