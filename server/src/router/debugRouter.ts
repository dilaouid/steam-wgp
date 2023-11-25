import { FastifyInstance } from 'fastify';
import { getAllEnvVariables } from '../controllers/debug/env';

export default async function debugRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.get('/env', getAllEnvVariables);
  });
}