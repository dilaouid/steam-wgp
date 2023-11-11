import fp from 'fastify-plugin';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { FastifyInstance } from 'fastify';

export const drizzlePlugin = fp(async (fastify: FastifyInstance, opts: { databaseUrl: string }) => {
  // Create a database client and configure drizzle-orm for postgres
  const queryClient = postgres(opts.databaseUrl);
  const db = drizzle(queryClient);

  // Decorate fastify with the database client
  fastify.decorate('db', db);

  // onClose hook for closing the database client when server stops
  fastify.addHook('onClose', async () => {
    fastify.log.info('Closing postgres connection...');
  });
});