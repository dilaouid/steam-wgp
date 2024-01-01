// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyInstance } from 'fastify';

export declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PROTOCOL?: 'http' | 'https';
      HOST?: string;
      PORT?: number;
      ORIGIN?: string;
      STEAM_API_KEY?: string;
      STEAM_REDIRECT_URI?: string;
      NODE_ENV?: string;
      SECRET_KEY: string;
      FRONT?: string;
      STEAM_GetOwnedGames?: string;
      PGHOST?: string;
      PGDATABASE?: string;
      PGUSER?: string;
      PGPASSWORD?: string;
      ENDPOINT_ID?: string;
      SERVER_HOST?: string;
    },
    db: PostgresJsDatabase<Record<string, never>>,
    websocket: FastifyWebsocket;
    waitlists: Map<string, Set<WebSocket>>;
  }
}