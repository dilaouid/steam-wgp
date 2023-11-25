// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyInstance } from 'fastify';

export declare module 'fastify' {
  interface FastifyInstance {
    config: {
      HOST?: string;
      PORT?: string;
      ORIGIN?: string;
      STEAM_API_KEY?: string;
      STEAM_REDIRECT_URI?: string;
      DATABASE_URL?: string;
      NODE_ENV?: string;
      SECRET_KEY?: string;
      FRONT?: string;
    },
    db: PostgresJsDatabase<Record<string, never>>,
    websocket: FastifyWebsocket;
    waitlists: Map<string, Set<WebSocket>>;
  }
}