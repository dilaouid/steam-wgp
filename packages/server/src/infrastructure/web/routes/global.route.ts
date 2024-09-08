import { FastifyInstance } from 'fastify';
import {
  getStats
} from '../controllers/global.controller';

export default async function globalRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    // Route to get the global statistics of the application (number of games, users, etc.)
    fastify.get('/stats', getStats);
  });
}