import { FastifyInstance } from 'fastify';
import { Profile } from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import fastifyPassport from '@fastify/passport';

import { Players } from '../models';
import { Player } from '../models/Players';

export default async function authRouter(fastify: FastifyInstance) {
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  fastifyPassport.use(new SteamStrategy({
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

  fastify.register(async function (fastify) {

    // Route pour initier l'authentification Steam
    fastify.get('/steam', { preValidation: fastifyPassport.authenticate('steam', { session: false }) }, async (request, reply) => {
      if (!request.user) throw new Error('Missing user object in request');
      return reply.send(request.user);
    });

    // Route de callback après l'authentification Steam
    fastify.get('/steam/callback',
      { preValidation: fastifyPassport.authenticate('steam', { session: false, failureRedirect: '/login' }) },
      async (request, reply) => {
        // Utilisateur authentifié avec succès
        // Vous pouvez gérer l'utilisateur ici, par exemple générer un JWT ou gérer la session
        // Puis rediriger l'utilisateur vers une page de profil ou d'accueil
        return reply.send(request.user);
      }
    );
  });
}