/* eslint-disable no-multi-spaces */
import { FastifyInstance } from 'fastify';

import {
  updateHiddenGamesOpts as updateHiddenGames,
  getLibraryOpts as getLibrary
} from '../controllers/library';

export default async function libraryRouter(fastify: FastifyInstance) {
  fastify.register(async function (app) {
    app.route(getLibrary);        // :GET /
    app.route(updateHiddenGames); // :PATCH /
  });
}