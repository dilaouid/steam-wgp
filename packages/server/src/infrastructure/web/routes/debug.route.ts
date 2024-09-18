import { FastifyInstance } from 'fastify';
import { getAllEnvVariables, truncateAll, seed } from '../controllers/debug';

// This route is only available in development mode, and it is used to debug the application.
// Use it *CAREFULLY*, as it can delete all data in the database.

/**
 * Registers the debug router.
 *
 * @param fastify - The Fastify instance.
 */
export default async function debugRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    // Route to get all environment variables
    fastify.get('/env', getAllEnvVariables); // :GET /debug/env

    // Route to truncate all data in the database
    fastify.get('/truncate', truncateAll); // :GET /debug/truncate

    // Route to seed the database with games
    fastify.get('/seed', seed); // :GET /debug/seed
  });
}