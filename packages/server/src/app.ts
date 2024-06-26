import Fastify from 'fastify';
import * as plugins from './plugins';
import debugRouter from './router/debugRouter';
import authRouter from './router/authRouter';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import playerRouter from './router/playersRouter';
import waitlistRouter from './router/waitlistRouter';
import libraryRouter from './router/libraryRouter';
import globalRouter from './router/globalRouter';

import { FastifySSEPlugin } from "fastify-sse-v2";

const fastify: any = Fastify({
  logger: plugins.logger,
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true
});

const initialize = async () => {
  try {
    await plugins.envPlugin(fastify);
    await fastify.after();

    // ====================  Every plugins are loaded, we can now load the routes below
    plugins.corsPlugin(fastify).ready((err: Error) => {
      if (err) fastify.log.error(err);
    });

    plugins.languageHookPlugin(fastify).ready((err: Error | null) => {
      if (err) fastify.log.error(err);
    });

    plugins.websocketPlugin(fastify).ready((err: Error | null) => {
      if (err) fastify.log.error(err);
    });

    plugins.rateLimitPlugin(fastify).ready((err: Error | null) => {
      if (err) fastify.log.error('Rate limit exceeded');
    });

    await fastify.register(FastifySSEPlugin);
    await fastify.register(fastifyCookie);
    await fastify.register(fastifySession, { secret: fastify.config.SECRET_KEY });

    await fastify.register(plugins.drizzlePlugin, fastify.config);
    // ==================== End of plugins loading

    // ==================== Routes loading below
    if (fastify.config.NODE_ENV === 'development')
      await fastify.register(debugRouter, { prefix: '/debug' });
    await fastify.register(authRouter, { prefix: '/auth' });
    await fastify.register(playerRouter, { prefix: '/players' });
    await fastify.register(waitlistRouter, { prefix: '/waitlist' });
    await fastify.register(libraryRouter, { prefix: '/library' });
    await fastify.register(globalRouter, { prefix: '/' });
    // ==================== End of routes loading

    // ==================== Server boot and listen
    const port = fastify.config.PORT || 3000;
    await fastify.listen({ port, host: fastify.config.SERVER_HOST, listenTextResolver: (address: string) => {
      return `Server listening on ${address}`
    }}, (error: any) => {
      if (error) throw error;
    });

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

initialize();