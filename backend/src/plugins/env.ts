import fastifyEnv from '@fastify/env';

const schema = {
    type: 'object',
    required: ['PORT'],
    properties: {
        PORT: {
            type: 'string',
            default: '8080'
        },
        ORIGIN: {
            type: 'string',
            default: 'http://localhost:3000'
        }
    }
};

const options = {
    confKey: 'config',
    schema,
    dotenv: true
};

export const envPlugin = async (fastify: any) => {
    return fastify.register(fastifyEnv, options);
};