import { FastifyInstance } from 'fastify';
import { getAllEnvVariables, truncateAll, seed } from '../controllers/debug';

export default async function debugRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.get('/env', getAllEnvVariables);
    fastify.get('/truncate', truncateAll);
    fastify.get('/seed', seed);
  });
}