import fastifyEnv from '@fastify/env';

const schema = {
    type: 'object',
    required: ['PORT', 'STEAM_API_KEY'],
    properties: {
        HOST: {
            type: 'string',
            default: 'localhost'
        },
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
        },
        DATABASE_URL: {
            type: 'string',
            default: 'postgres://postgres:postgres@localhost:5432/steam'
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