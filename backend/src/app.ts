import Fastify, { FastifyError } from 'fastify'
import * as plugins from './plugins'

const fastify: any = Fastify({
  logger: plugins.logger,
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true
});

const initialize = async () => {
  await plugins.envPlugin(fastify);
  await fastify.after()

  await plugins.websocketPlugin(fastify).ready((err: Error) => {
    if (err) console.error(err)
  });

  await plugins.corsPlugin(fastify).ready((err: Error) => {
    if (err) console.error(err)
  });
};

initialize();

fastify.get('/', async () => {
  return { hello: 'world' };
});

(async () => {
  try {
    await fastify.ready()
    await fastify.listen({ port: fastify.config.PORT }, (err: FastifyError) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
    });
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
})();