import { FastifyInstance } from "fastify";
import { isPlayerInASteamder } from "../../infrastructure/repositories";

/**
 * Checks if a user is in the steamder.
 *
 * @param fastify - The Fastify instance.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to a boolean indicating whether the user is in the steamder.
 */
export const isUserInSteamder = async (fastify: FastifyInstance, userId: bigint): Promise<boolean> => {
  const inSteamder = await isPlayerInASteamder(fastify, userId);
  return inSteamder.length > 0;
};
