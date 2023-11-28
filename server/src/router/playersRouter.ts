import { FastifyInstance } from 'fastify';

import {
  getSteamLibraryOpts as getSteamLibrary
} from '../controllers/players/getSteamLibrary';

export default async function playerRouter(fastify: FastifyInstance) {
  fastify.register(async function (app) {
    app.route(getSteamLibrary); // :GET /library-checker/:id
  });
}