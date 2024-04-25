import { FastifyInstance } from 'fastify';
import { Strategy as SteamStrategy } from 'passport-steam';
import fastifyPassport from '@fastify/passport';
import { and, eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

import { DeletedUsers, Players, WaitlistsPlayers } from '../models';
import { Player } from '../models/Players';
import { isAuthenticated } from '../auth/mw';
import { APIResponse } from '../utils/response';
import i18next from '../plugins/i18n.plugin';

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
      let user;
      if (!player) {
        return done(null, null);
      }

      // check if the user is not in the deletedusers table
      const isUserDeleted = await fastify.db.select({ delete_date: DeletedUsers.model.delete_date })
        .from(DeletedUsers.model)
        .where(
          and(
            eq(DeletedUsers.model.id, player.steamid)
          )
        );
      if (isUserDeleted.length > 0) {
        if (Date.now() - isUserDeleted[0].delete_date > 172800000) {
          fastify.log.info(`User ${player.steamid} is in the deletedusers table, but he can login now`);
          await fastify.db.delete(DeletedUsers.model).where(eq(DeletedUsers.model.id, player.steamid)).execute();
        } else {
          fastify.log.warn(`User ${player.steamid} is in the deletedusers table, he can't login yet`);
          return done(new Error(`You cannot login yet, since you have deleted your account recently, please wait ${Math.ceil((172800000 - (Date.now() - isUserDeleted[0].delete_date)) / 1000 / 60 / 60)} more hours`), null);
        }
      }
      /////////////////////////////////////////////

      const existingUser = await fastify.db.select().from(Players.model).where(eq(Players.model.id, player.steamid as any));
      if (existingUser.length === 0) {
        fastify.log.info('Inserting new user');
        const [newUser] = await fastify.db.insert(Players.model).values({
          id: player.steamid,
          avatar_hash: player.avatarhash,
          username: player.personaname,
          profileurl: player.profileurl
        }).returning({ id: Players.model.id, avatar_hash: Players.model.avatar_hash });
        user = newUser;
      } else {
        fastify.log.warn('User already exists');
        if (existingUser[0].avatar_hash !== player.avatarhash) {
          fastify.log.info('Updating avatar hash');
          await fastify.db.update(Players.model).set({ avatar_hash: player.avatarhash }).where(eq(Players.model.id, player.steamid as any)).execute();
        }
        if (existingUser[0].username !== player.personaname) {
          fastify.log.info('Updating username');
          await fastify.db.update(Players.model).set({ username: player.personaname }).where(eq(Players.model.id, player.steamid as any)).execute();
        }
        if (existingUser[0].profileurl !== player.profileurl) {
          fastify.log.info('Updating profile url');
          await fastify.db.update(Players.model).set({ profileurl: player.profileurl }).where(eq(Players.model.id, player.steamid as any)).execute();
        }

        user = existingUser[0];
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
        return APIResponse(reply, null, 'logged_in_to_view_profile', 401);
      return APIResponse(reply, request.user, 'logged_in', 200);
    });

    // Route de callback après l'authentification Steam
    fastify.get('/steam/callback', { preValidation: fastifyPassport.authenticate('steam', { session: false, failureRedirect: '/logout' }) },
      async (request, reply) => {
        if (!request.user) throw new Error('Missing user object in request');
        const user = request.user as Player & { username: string };
        const jwtToken = jwt.sign({ id: String(user.id), username: user.username, avatar_hash: user.avatar_hash }, fastify.config.SECRET_KEY, { expiresIn: '5h' });
        reply.setCookie('token', jwtToken, {
          httpOnly: process.env.NODE_ENV === 'production',
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 18000,
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : true,
          domain: process.env.NODE_ENV === 'production' ? fastify.config.DOMAIN : undefined
        });
        return reply.redirect(`${fastify.config.FRONT}/login${fastify.config.NOT_SAME_ORIGIN ? '?token=' + jwtToken : ''}`);
      }
    );

    // Route pour déconnecter l'utilisateur
    fastify.get('/logout', async (request, reply) => {
      request.logOut();
      reply.clearCookie("token")
      return APIResponse(reply, null, 'logged_out', 200);
    });

    fastify.get('/me', { preValidation: isAuthenticated }, async (request, reply) => {
      if (!request.user)
        return APIResponse(reply, null, 'logged_in_to_view_profile', 401);
      const user = request.user as Player & { username: string };
      const findRoom = await fastify.db.select({
        waitlist: WaitlistsPlayers.model.waitlist_id
      }).from(WaitlistsPlayers.model).where(eq(WaitlistsPlayers.model.player_id, user.id))
      const { waitlist } = findRoom?.length > 0 ? findRoom[0] : '';
      return APIResponse(reply, { id: user.id, username: user.username, waitlist, avatar_hash: user.avatar_hash }, i18next.t('logged_in', { lng: request.userLanguage }), 200);
    });

  });
}