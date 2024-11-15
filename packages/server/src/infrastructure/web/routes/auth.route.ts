import { FastifyInstance } from 'fastify';
import fastifyPassport from '@fastify/passport';
import { isAuthenticated } from '../../../auth/mw';
import { getMe, logoutUser, steam, steamCallback } from '@controllers/auth';
import { configureSteamStrategy } from '../../auth/steamStrategy';

export default async function authRouter(fastify: FastifyInstance) {
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  // Configure the Steam strategy
  configureSteamStrategy(fastify);

  fastify.register(async function (fastify) {
    // Route to connect with Steam OpenID
    fastify.get('/steam', { preValidation: fastifyPassport.authenticate('steam', { session: false }) }, steam); // :GET /auth/steam

    // Route to handle the Steam callback (redirected from Steam)
    fastify.get('/steam/callback', { preValidation: fastifyPassport.authenticate('steam', { session: false, failureRedirect: '/logout' }) }, steamCallback(fastify)); // :GET /auth/steam/callback

    // Route to disconnect the user
    // [GET] /auth/logout
    fastify.get('/logout', logoutUser(fastify)); // :GET /auth/logout

    // Route to get the user's profile information (requires authentication)
    fastify.get('/me', { preValidation: isAuthenticated }, getMe(fastify)); // :GET /auth/me
  });
}