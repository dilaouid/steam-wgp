import { FastifyInstance } from 'fastify';
import websocket from '@fastify/websocket'
import jwt from 'jsonwebtoken';
import { WebSocket } from 'ws';

export const websocketPlugin = (fastify: FastifyInstance) => {

  const waitlists = new Map<string, Set<WebSocket>>();
  fastify.decorate('waitlists', waitlists);

  return fastify.register(websocket, { options: {
    maxPayload: 1048576,
    server: fastify.server,
    verifyClient: function (info, next) {
      try {
        const token = info.req.headers['sec-websocket-protocol'];
        if (!token) throw new Error('No token provided');
        const decoded = jwt.verify(token, fastify.config.SECRET_KEY);
        (info.req as any).user = decoded;
        next(true);
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