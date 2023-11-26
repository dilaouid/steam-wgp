import { FastifyInstance } from 'fastify';
import { getSteamLibrary } from '../controllers/players/getSteamLibrary';

export default async function playerRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.get('/library-checker/:id', getSteamLibrary);
  });
}