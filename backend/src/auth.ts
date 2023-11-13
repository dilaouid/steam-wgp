import { FastifyInstance } from 'fastify';
import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyPassport from '@fastify/passport';

export default async function (fastify: FastifyInstance) {

  // Configuration de la stratégie Steam
  passport.use(new SteamStrategy({
    returnURL: fastify.config.STEAM_REDIRECT_URI, // URL de retour (front) après authentification
    realm: fastify.config.FRONT, // URL de l'application front
    apiKey: fastify.config.STEAM_API_KEY
  },
  function(_identifier:any, profile:any, done:any) { // to type later

    // Logique d'authentification (check si l'utilisateur existe en base de données etc)
    return done(null, profile);
  }
  ));

  // Serialization et deserialization des utilisateurs
  fastifyPassport.registerUserSerializer(async (user) => user);
  fastifyPassport.registerUserDeserializer(async (user) => user);

  // Enregistrement des plugins nécessaires pour la gestion des sessions
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, { secret: fastify.config.SECRET_KEY ?? 'your-secret' });
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

}