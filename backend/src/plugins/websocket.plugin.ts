import { FastifyInstance } from 'fastify';
import websocket from '@fastify/websocket'

export const websocketPlugin = (fastify: FastifyInstance) => {
  return fastify.register(websocket, { options: {
    maxPayload: 1048576,
    server: fastify.server,
    verifyClient: function (info, next) {
      // [todo] jwt mw check
    }
  }});
};