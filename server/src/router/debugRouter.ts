import { FastifyInstance } from 'fastify';
import { TestRouter, getAllEnvVariables, truncateAll, loginOfflineMode } from '../controllers/debug';

export default async function debugRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.get('/env', getAllEnvVariables);
    fastify.get('/truncate', truncateAll);
    fastify.get('/test', TestRouter);
    fastify.get('/login', loginOfflineMode);
  });
}