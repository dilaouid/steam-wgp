import { FastifyInstance } from 'fastify';
import { getAllEnvVariables } from '../controllers/debug/env';

export default async function waitlistRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.get('/env', getAllEnvVariables);
  }, { prefix: '/debug' });
}