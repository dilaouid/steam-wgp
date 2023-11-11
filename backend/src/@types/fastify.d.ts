// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyInstance } from 'fastify';

// Étendez la déclaration de FastifyInstance pour inclure votre propriété config
export declare module 'fastify' {
  interface FastifyInstance {
    config: {
      HOST?: string;
      PORT?: string;
      ORIGIN?: string;
      STEAM_API_KEY?: string;
      DATABASE_URL?: string;
      NODE_ENV?: string;
    };
  }
}