import { FastifyInstance, FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { Player } from "../../models/Players";
import { insertWaitlist } from "../../models/Waitlists";
import { isAuthenticated } from "../../auth/mw";
import { APIResponse } from "../../utils/response";

export const createWaitlistOpts = {
  method: 'POST' as HTTPMethods,
  url: '/',
  handler: createWaitlist,
  preValidation: [isAuthenticated]
};

async function createWaitlist(request: FastifyRequest, reply: FastifyReply) {
  const { id } = (request.user as Player);
  const fastify = request.server as FastifyInstance;

  if (!id)
    return APIResponse(reply, null, 'Vous devez être connecté pour créer une room', 401);
  try {
    const insert = await insertWaitlist(fastify, id);
    if (insert.error)
      return APIResponse(reply, null, insert.error, 400);
    return APIResponse(reply, insert, 'Room créée avec succès', 201);
  } catch (err) {
    return APIResponse(reply, null, 'Une erreur interne est survenue', 500);
  }
}