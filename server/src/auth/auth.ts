import { FastifyInstance } from 'fastify';
import passport, { Profile } from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyPassport from '@fastify/passport';
import { Players } from '../models';
import { Player } from '../models/Players';

export default async function (fastify: FastifyInstance) {

  // Configuration de la stratégie Steam
  passport.use(new SteamStrategy({
    returnURL: fastify.config.STEAM_REDIRECT_URI, // URL de retour (front) après authentification
    realm: fastify.config.FRONT, // URL de l'application front
    apiKey: fastify.config.STEAM_API_KEY
  },
  function(identifier: string, profile: Profile, done: (err: any, user?: any) => void) {

    // to test to see what profile is equal to later
    fastify.log.info(profile);

    fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${fastify.config.STEAM_API_KEY}&steamids=${identifier}`)
      .then((response: any) => {
        return response.json();
      }).then((data: any) => {
        const player = data.response.players[0];
        if (!player) {
          return done(null, null);
        }
        fastify.db.select().from(Players.model).where('id', player.steamid).then((result: any) => {
          if (!result) {
            fastify.db.insert().into(Players.model).set({
              id: player.steamid,
              avatar_hash: player.avatarhash,
            }).then((result: any) => {
              fastify.log.info(`New player ${identifier} created`);
              return done(null, result);
            }).catch((err: any) => {
              fastify.log.error(err);
              return done(null, null);
            });
          } else {
            return done(null, result);
          }
        });
      }).catch((err: any) => {
        fastify.log.error(err);
        return done(null, null);
      });
  }
  ));

  // Serialization et deserialization des utilisateurs
  fastifyPassport.registerUserSerializer(async (user: Player) => user);
  fastifyPassport.registerUserDeserializer(async (user: Player) => user);

  // Enregistrement des plugins nécessaires pour la gestion des sessions
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, { secret: fastify.config.SECRET_KEY ?? 'your-secret' });
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

}