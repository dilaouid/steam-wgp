import { FastifyInstance } from 'fastify';
import {
  getStatsOpts as getStats
} from '../controllers/global/getStats';

export default async function globalRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.get('/stats', getStats);
  });
}