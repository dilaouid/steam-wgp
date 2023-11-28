import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

export async function isAuthenticated(req: FastifyRequest, res: FastifyReply) {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error('Token not found');
    }

    const secretKey = req.server.config.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    return;
  } catch (error) {
    return res.status(401).send({ error: 'Forbidden' });
  }
}