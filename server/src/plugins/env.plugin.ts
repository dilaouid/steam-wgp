import fastifyEnv from '@fastify/env';

const schema = {
  type: 'object',
  required: ['PORT', 'STEAM_API_KEY'],
  properties: {
    HOST: {
      type: 'string',
      default: 'localhost'
    },
    PROTOCOL: {
      type: 'string',
      default: 'http'
    },
    PORT: {
      type: 'string',
      default: '8080'
    },
    SERVER_HOST: {
      type: 'string',
      default: 'localhost'
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
    },
    PGHOST: {
      type: 'string',
      default: 'localhost'
    },
    PGDATABASE:{
      type: 'string',
      default: 'steamwgp'
    },
    PGUSER:{
      type: 'string',
      default: 'postgres'
    },
    PGPASSWORD:{
      type: 'string',
      default: 'postgres'
    },
    ENDPOINT_ID:{
      type: 'string',
      default: 'steamwgp'
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