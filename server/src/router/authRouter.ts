import { FastifyInstance } from 'fastify';
import { Strategy as SteamStrategy } from 'passport-steam';
import fastifyPassport from '@fastify/passport';
import jwt from 'jsonwebtoken';

import { Players } from '../models';
import { Player } from '../models/Players';
import { eq } from 'drizzle-orm';
import { isAuthenticated } from '../auth/mw';
import { APIResponse } from '../utils/response';

export default async function authRouter(fastify: FastifyInstance) {
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  const host = `http://${fastify.config.HOST}:${fastify.config.PORT}`;

  fastifyPassport.use(new SteamStrategy({
    returnURL: `${host}/auth/steam/callback`,
    realm: host,
    apiKey: fastify.config.STEAM_API_KEY
  }, async (identifier: string, profile: any, done: (err: Error | null, user: Player | null) => void) => {
    try {
      const player = profile._json;
      let user;
      if (!player) {
        return done(null, null);
      }

      const existingUser = await fastify.db.select().from(Players.model).where(eq(Players.model.id, player.steamid as any));
      if (existingUser.length === 0) {
        fastify.log.info('Inserting new user');
        const [newUser] = await fastify.db.insert(Players.model).values({
          id: player.steamid,
          avatar_hash: player.avatarhash,
        }).returning({ id: Players.model.id, avatar_hash: Players.model.avatar_hash });
        user = { ...newUser, username: player.personaname } as Player & { username: string };
      } else {
        fastify.log.warn('User already exists');
        user = { ...existingUser[0], username: player.personaname } as Player & { username: string };
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
      if (!request.user)
        return APIResponse(reply, null, 'Vous devez être connecté pour accéder à votre profil', 401);
      return APIResponse(reply, request.user, 'Vous êtes connecté', 200);
    });

    // Route de callback après l'authentification Steam
    fastify.get('/steam/callback', { preValidation: fastifyPassport.authenticate('steam', { session: false, failureRedirect: '/logout' }) },
      async (request, reply) => {
        if (!request.user) throw new Error('Missing user object in request');
        const user = request.user as Player & { username: string };
        const jwtToken = jwt.sign({ id: String(user.id), username: user.username }, fastify.config.SECRET_KEY, { expiresIn: '1h' });
        reply.setCookie('token', jwtToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 3600
        });

        return reply.redirect(fastify.config.FRONT + '');
      }
    );

    // Route pour déconnecter l'utilisateur
    fastify.get('/logout', async (request, reply) => {
      request.logOut();
      reply.clearCookie("token")
      return APIResponse(reply, null, 'Vous êtes déconnecté', 200);
    });

    fastify.get('/me', { preValidation: isAuthenticated }, async (request, reply) => {
      if (!request.user)
        return APIResponse(reply, null, 'Vous devez être connecté pour accéder à votre profil', 401);
      const user = request.user as Player & { username: string };
      // fastify.db.select() todo-> get waitlist id
      return APIResponse(reply, { id: user.id, username: user.username }, "Vous êtes connecté", 200);
    });

  });
}