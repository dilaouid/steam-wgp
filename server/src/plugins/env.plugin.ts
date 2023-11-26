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
    STEAM_REDIRECT_URI: {
      type: 'string',
      default: 'http://localhost:3000/auth/steam/callback'
    },
    DATABASE_URL: {
      type: 'string',
      default: 'postgres://postgres:postgres@localhost:5432/steam'
    },
    NODE_ENV: {
      type: 'string',
      default: 'development',
    },
    SECRET_KEY: {
      type: 'string',
      default: 'your-secret'
    },
    FRONT: {
      type: 'string',
      default: 'http://localhost:3000'
    },
    STEAM_GetOwnedGames: {
      type: 'string',
      default: 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001',
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