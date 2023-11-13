// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyInstance } from 'fastify';

export declare module 'fastify' {
  interface FastifyInstance {
    config: {
      HOST?: string;
      PORT?: string;
      ORIGIN?: string;
      STEAM_API_KEY?: string;
      DATABASE_URL?: string;
      NODE_ENV?: string;
    },
    db: PostgresJsDatabase<Record<string, never>>,
    websocket: FastifyWebsocket;
  }
}