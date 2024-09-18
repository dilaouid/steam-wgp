import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";

import {
  deletedUsers,
  games,
  libraries,
  steamders,
  steamdersPlayers,
  players,
} from "../../../data/schemas";


/**
 * [DEBUG - Works only in development] Truncates all data in the database.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A response object with a message indicating that everything has been deleted.
 */
export const truncateAll = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const fastify = request.server as FastifyInstance;
  const { db } = fastify;

  await db.delete(games);
  await db.delete(libraries);
  await db.delete(steamdersPlayers);
  await db.delete(players);
  await db.delete(steamders);
  await db.delete(deletedUsers);
  reply.send({ message: "Everything has been deleted" });
};