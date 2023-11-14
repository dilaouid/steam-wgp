import { FastifyRequest, FastifyReply } from 'fastify';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function isAuthenticated(req: FastifyRequest, res: FastifyReply, done: Function) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    done();
  } else {
    res.status(401).send({ error: 'Forbidden' });
  }
}