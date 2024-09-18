import { FastifyInstance } from 'fastify';
import fastifyPassport from '@fastify/passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import { validateSteam } from './validateSteam';

export const configureSteamStrategy = (fastify: FastifyInstance) => {
  const host = `${fastify.config.PROTOCOL}://${fastify.config.HOST}${fastify.config.NODE_ENV === 'production' ? '' : ':' + fastify.config.PORT}`;

  fastifyPassport.use(new SteamStrategy({
    returnURL: `${host}/auth/steam/callback`,
    realm: host,
    apiKey: fastify.config.STEAM_API_KEY as string,
  }, async (identifier: string, profile: any, done) => {
    await validateSteam(fastify, identifier, profile, done);
  }));
};