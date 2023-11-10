import Fastify, { FastifyError } from 'fastify';
import * as plugins from './plugins';

const fastify: any = Fastify({
  logger: plugins.logger,
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true
});

// ==================== Routes loading below
fastify.get('/', async () => {
  return { hello: 'world' };
});
// ==================== End of routes loading

const initialize = async () => {
  try {
    await plugins.envPlugin(fastify);
    await fastify.after();

    // ====================  Every plugins are loaded, we can now load the routes below
    plugins.websocketPlugin(fastify).ready((err: Error) => {
      if (err) fastify.log.error(err);
    });

    plugins.corsPlugin(fastify).ready((err: Error) => {
      if (err) fastify.log.error(err);
    });

    await fastify.register(plugins.drizzlePlugin, { databaseUrl: fastify.config.DATABASE_URL });

    // ==================== End of plugins loading

    // ==================== Server boot and listen
    const port = parseInt(fastify.config.PORT, 10) || 8000;
    await fastify.listen({port, listenTextResolver: (address: string) => {
      return `Server listening on port ${address}:${port}`
    }});

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

initialize();