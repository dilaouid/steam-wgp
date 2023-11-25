import { FastifyInstance } from 'fastify';
import websocket from '@fastify/websocket'
import { WebSocket } from 'ws';

export const websocketPlugin = (fastify: FastifyInstance) => {

  const waitlists = new Map<string, Set<WebSocket>>();
  fastify.decorate('waitlists', waitlists);

  return fastify.register(websocket, { options: {
    maxPayload: 1048576,
    server: fastify.server,
    verifyClient: function (info, next) {
      try {
        const url = new URL(info.req.url ?? '', `http://${info.req.headers.host}`);
        const token = url.searchParams.get('token');
        if (!token)
          throw new Error('No token provided');

        // TODO: verify token with jwt or something
        // (it may be difficult: cookies are not sent with websocket requests :'()
        // if you read this save me please :(
        // sql request to check if token is valid ? (but it's not a good idea to do a sql request for each websocket request)
        // maybe we can store the token in the database and check if it's valid
        // but it's not a good idea to store the token in the database because it's not a good practice to store a token in a database (I think)
        // so what can we do ? :( boy I'm so sad right now :(
        // (I'm not sure if I can do this)
        // also I just ate a delicious sandwich (batboute) :D
        // I'm gonna stop writing comments now
        // bye

      } catch (err) {
        fastify.log.error('WebSockets Authentification error', err);
        next(false, 401, 'Unauthorized');
      }
    }
  }}).after(() => {

    // websocket route for waitlist actions
    fastify.get('/ws/:waitlistId', { websocket: true }, (connection, req) => {
      const { waitlistId } = req.params as { waitlistId: string };
      if (!waitlists.has(waitlistId)) {
        waitlists.set(waitlistId, new Set<WebSocket>());
      }

      const waitlistClients = waitlists.get(waitlistId);
      if (!waitlistClients)
        throw new Error('waitlistClients is undefined');
      waitlistClients.add(connection.socket);

      connection.socket.on('close', () => {
        waitlistClients.delete(connection.socket);
      });
    });

  });
};