import fastifyEnv from '@fastify/env';

const schema = {
    type: 'object',
    required: ['PORT', 'STEAM_API_KEY'],
    properties: {
        PORT: {
            type: 'string',
            default: '8080'
        },
        ORIGIN: {
            type: 'string',
            default: 'http://localhost:3000'
        },
        STEAM_API_KEY: {
            type: 'string'
        }
    }
};

export const envPlugin = async (fastify: any) => {
    return fastify.register(fastifyEnv, {
        confKey: 'config',
        schema,
        dotenv: true
    });
};