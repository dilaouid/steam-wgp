import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';

import { Players } from '../models';

export async function isAuthenticated(req: FastifyRequest, res: FastifyReply) {
  try {
    let token;

    if (req.cookies && req.cookies.token)
      token = req.cookies.token;
    else if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const bearerToken = authHeader.split(' ');
      if (bearerToken.length === 2 && bearerToken[0] === 'Bearer')
        token = bearerToken[1];
    }

    if (!token)
      throw new Error('Token not found');

    const secretKey = req.server.config.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey) as any;

    const userExists = await req.server.db.select().from(Players.model).where(eq(Players.model.id, decoded.id)).execute();

    if (!userExists)
      throw new Error('User not found');

    req.user = decoded;
  } catch (error) {
    return res.status(401).send({ error: 'Forbidden' });
  }
}

export async function allowUnauthenticated(req: FastifyRequest, res: FastifyReply) {
  try {
    let token;

    if (req.cookies && req.cookies.token)
      token = req.cookies.token;
    else if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const bearerToken = authHeader.split(' ');
      if (bearerToken.length === 2 && bearerToken[0] === 'Bearer') {
        token = bearerToken[1];
      }
    }

    if (!token || token == 'undefined') {
      return;
    }

    const secretKey = req.server.config.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send({ error: 'Forbidden' });
  }
}