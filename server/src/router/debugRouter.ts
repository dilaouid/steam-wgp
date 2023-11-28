import { FastifyInstance } from 'fastify';
import { getAllEnvVariables } from '../controllers/debug/env';
import { truncateAll } from '../controllers/debug/truncate';

export default async function debugRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.get('/env', getAllEnvVariables);
    fastify.get('/truncate', truncateAll);
  });
}