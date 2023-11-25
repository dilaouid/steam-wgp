import { FastifyInstance } from 'fastify';
import passport, { Profile } from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import fastifySession from '@fastify/session';
import fastifyPassport from '@fastify/passport';
import { Players } from '../models';
import { Player } from '../models/Players';

export default async function (fastify: FastifyInstance) {
  fastify.register(fastifySession, {
    secret: fastify.config.SECRET_KEY ?? 'your-secret',
    cookie: { secure: process.env.NODE_ENV === 'production' }
  });

  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  passport.use(new SteamStrategy({
    returnURL: fastify.config.STEAM_REDIRECT_URI,
    realm: fastify.config.FRONT,
    apiKey: fastify.config.STEAM_API_KEY
  }, async (identifier: string, profile: Profile, done: (err: Error | null, user: Player | null) => void) => {
    try {
      const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${fastify.config.STEAM_API_KEY}&steamids=${identifier}`);
      const data = await response.json() as { response: { players: { steamid: string, avatarhash: string }[] } };
      const player = data.response.players[0];
      if (!player) {
        return done(null, null);
      }

      let user = await fastify.db.select().from(Players.model).where('id', player.steamid);
      if (user.length === 0) {
        user = await fastify.db.insert().into(Players.model).set({
          id: player.steamid,
          avatar_hash: player.avatarhash,
        });
      } else {
        user = user[0];
      }

      return done(null, user);
    } catch (err) {
      fastify.log.error(err);
      return done(err as Error, null);
    }
  }));

  fastifyPassport.registerUserSerializer(async (user: Player) => user);
  fastifyPassport.registerUserDeserializer(async (user: Player) => user);
}