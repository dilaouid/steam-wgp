import { FastifyInstance } from "fastify";
import { isPlayerInASteamder, isPlayerInSteamder } from "@repositories";

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

/**
 * Checks if a user is in a specific Steamder.
 *
 * @param fastify - The Fastify instance.
 * @param userId - The ID of the user.
 * @param steamderId - The ID of the Steamder.
 * @returns A promise that resolves to a boolean indicating whether the user is in the specified Steamder.
 */
export const isUserInSpecificSteamder = async (fastify: FastifyInstance, userId: bigint, steamderId: string): Promise<boolean> => {
  const inSteamder = await isPlayerInSteamder(fastify, userId, steamderId);
  return inSteamder.length > 0;
}