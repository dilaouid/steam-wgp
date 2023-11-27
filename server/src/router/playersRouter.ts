import { FastifyInstance } from 'fastify';
import {
  getSteamLibrary,
  GetSteamLibraryRequest,
  getWaitlistWithPlayersOpts as getOpts
} from '../controllers/players/getSteamLibrary';

export default async function playerRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.get<{ Params: GetSteamLibraryRequest }>('/library-checker/:id', getOpts, getSteamLibrary);
  });
}