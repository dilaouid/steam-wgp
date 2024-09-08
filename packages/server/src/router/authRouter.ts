import { FastifyInstance } from 'fastify';
import { Strategy as SteamStrategy } from 'passport-steam';
import fastifyPassport from '@fastify/passport';

import { Player } from '../models/Players';
import { isAuthenticated } from '../auth/mw';
import { APIResponse } from '../utils/response';
import i18next from '../plugins/i18n.plugin';
import { checkUserDeleted, getUserWaitlist, login, logout } from '../domain/services/AuthService';
import { retrieveUserById } from '../domain/services/PlayerService';

export default async function authRouter(fastify: FastifyInstance) {
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  const host = `${fastify.config.PROTOCOL}://${fastify.config.HOST}${fastify.config.NODE_ENV === 'production' ? '' : ':' + fastify.config.PORT}`;

  fastifyPassport.use(new SteamStrategy({
    returnURL: `${host}/auth/steam/callback`,
    realm: host,
    apiKey: fastify.config.STEAM_API_KEY as string
  }, async (identifier: string, profile: any, done: (err: Error | null, user: Player | null) => void) => {
    try {
      const player = profile._json;
      if (!player) {
        return done(null, null);
      }

      const userId = BigInt(player.steamid);

      // check if the user is not in the deletedusers table
      await checkUserDeleted(fastify, userId);

      // check if the user is in the database, if not, add it, otherwise update it if needed
      const user = await retrieveUserById(fastify, userId, player);

      return done(null, user);
    } catch (err) {
      fastify.log.error(err);
      return done(err as Error, null);
    }
  }));

  fastify.register(async function (fastify) {

    // Route pour initier l'authentification Steam
    fastify.get('/steam', { preValidation: fastifyPassport.authenticate('steam', { session: false }) }, async (request, reply) => {
      if (!request.user)
        return APIResponse(reply, null, 'logged_in_to_view_profile', 401);
      return APIResponse(reply, request.user, 'logged_in', 200);
    });

    // Route de callback après l'authentification Steam
    fastify.get('/steam/callback', { preValidation: fastifyPassport.authenticate('steam', { session: false, failureRedirect: '/logout' }) },
      (request, reply) => {
        return login(fastify, reply, request);
      }
    );
    // Route pour déconnecter l'utilisateur
    fastify.get('/logout', async (request, reply) => {
      logout(fastify, reply, request);
      return APIResponse(reply, null, 'logged_out', 200);
    });

    fastify.get('/me', { preValidation: isAuthenticated }, async (request, reply) => {
      if (!request.user)
        return APIResponse(reply, null, 'logged_in_to_view_profile', 401);
      const user = request.user as Player & { username: string };
      const waitlist = await getUserWaitlist(fastify, BigInt(user.id));
      return APIResponse(reply, { id: user.id, username: user.username, waitlist, avatar_hash: user.avatar_hash }, i18next.t('logged_in', { lng: request.userLanguage }), 200);
    });

  });
}