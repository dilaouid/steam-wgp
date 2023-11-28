
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Games, Libraries, Players, Waitlists, WaitlistsPlayers } from "../../models";

export async function truncateAll(request: FastifyRequest, reply: FastifyReply) {
  const fastify = request.server as FastifyInstance;

  await fastify.db.delete(Games.model);
  await fastify.db.delete(Libraries.model);
  await fastify.db.delete(WaitlistsPlayers.model);
  await fastify.db.delete(Players.model);
  await fastify.db.delete(Waitlists.model);
  reply.send({ message: 'Everything has been deleted' });
}