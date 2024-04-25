/* eslint-disable no-multi-spaces */
import { FastifyInstance } from 'fastify';

import {
  getSteamLibraryOpts as getSteamLibrary,
  deleteUserOpts as deleteUser
} from '../controllers/players';

export default async function playerRouter(fastify: FastifyInstance) {
  fastify.register(async function (app) {
    app.route(getSteamLibrary); // :GET /library-checker
    app.route(deleteUser);      // :DELETE /
  });
}