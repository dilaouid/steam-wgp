import { FastifyInstance } from 'fastify';

import {
  updateHiddenGamesOpts as updateHiddenGames,
} from '../controllers/library';

export default async function libraryRouter(fastify: FastifyInstance) {
  fastify.register(async function (app) {
    app.route(updateHiddenGames); // :PATCH /
  });
}