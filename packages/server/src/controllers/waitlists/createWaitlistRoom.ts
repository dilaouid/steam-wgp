import { FastifyInstance, FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { Player } from "../../models/Players";
import { insertWaitlist } from "../../models/Waitlists";
import { isAuthenticated } from "../../auth/mw";
import { APIResponse } from "../../utils/response";

export const createWaitlistOpts = {
  method: 'POST' as HTTPMethods,
  url: '/',
  handler: createWaitlist,
  preValidation: [isAuthenticated],
  body: {
    type: 'object',
    required: ['private'],
    properties: {
      name: {
        type: 'string',
        default: 'Steamder',
        minLength: 3,
        maxLength: 40
      },
      isPrivate: { type: 'boolean' }
    }
  }
};

async function createWaitlist(request: FastifyRequest, reply: FastifyReply) {
  const fastify = request.server as FastifyInstance;
  const { id } = (request.user as Player);

  const { isPrivate, name } = request.body as { isPrivate: boolean; name: string };
  if (typeof isPrivate !== 'boolean')
    return APIResponse(reply, null, 'Vous devez spécifier si la room est privée ou non', 400);

  if (typeof name !== 'string')
    return APIResponse(reply, null, 'Le nom de la room doit être une chaîne de caractères', 400);

  if ((name?.trim().length > 0 && name?.trim().length < 3) || name?.trim().length > 40)
    return APIResponse(reply, null, 'Le nom de la room doit faire entre 3 et 40 caractères', 400);

  if (!id)
    return APIResponse(reply, null, 'Vous devez être connecté pour créer une room', 401);
  try {
    const insert = await insertWaitlist(fastify, BigInt(id), isPrivate, name?.trim() || 'Steamder');
    if (insert.error)
      return APIResponse(reply, null, insert.error, 400);
    if (!insert.waitlist)
      return APIResponse(reply, null, 'Une erreur interne est survenue', 500);
    (insert.waitlist.admin_id as unknown | string) = insert?.waitlist?.admin_id?.toString() || "";
    return APIResponse(reply, insert.waitlist, 'Room créée avec succès', 201);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, 'Une erreur interne est survenue', 500);
  }
}