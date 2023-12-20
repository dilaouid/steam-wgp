import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import jwt from "jsonwebtoken"

const userId = 76561198065059816;

export async function loginOfflineMode(request: FastifyRequest, reply: FastifyReply) {
    const fastify = request.server as FastifyInstance;
  
    const jwtToken = jwt.sign({id: String(userId), username: "yedine"}, fastify.config.SECRET_KEY, { expiresIn: '1h' });
    reply.setCookie("token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 3600
    });
    return reply.redirect(fastify.config.FRONT + '');
}