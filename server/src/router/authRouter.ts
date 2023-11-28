import { FastifyInstance } from 'fastify';
import { Strategy as SteamStrategy } from 'passport-steam';
import fastifyPassport from '@fastify/passport';
import jwt from 'jsonwebtoken';

import { Players } from '../models';
import { Player } from '../models/Players';
import { eq } from 'drizzle-orm';

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
      if (!player) {
        return done(null, null);
      }

      let user = await fastify.db.select().from(Players.model).where(eq(Players.model.id, player.steamid as any));
      if (user.length === 0) {
        fastify.log.info('Inserting new user');
        user = await fastify.db.insert(Players.model).values({
          id: player.steamid,
          avatar_hash: player.avatarhash,
        });
      } else {
        fastify.log.warn('User already exists');
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
    fastify.get('/steam/callback', { preValidation: fastifyPassport.authenticate('steam', { session: false, failureRedirect: '/logout' }) },
      async (request, reply) => {
        if (!request.user) throw new Error('Missing user object in request');
        const user = request.user as Player;
        const jwtToken = jwt.sign({ id: String(user.id) }, fastify.config.SECRET_KEY, { expiresIn: '1h' });
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
      reply.status(200);
      reply.send({ message: 'Logged out' });
    });

  });
}