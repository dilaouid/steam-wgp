import { FastifyInstance } from "fastify";
import { completeSteamder, updateSteamder } from "@repositories";

export const deleteSteamder = async (fastify: FastifyInstance, steamderId: string, winner: number) => {
  const steamder: any = fastify.steamders.get(steamderId);
  if (!steamder) return;

  // update complete status of the steamder in the database
  await updateSteamder(fastify, steamderId, { complete: true, selected: winner });

  // remove all steamders players from the database for this steamder
  await completeSteamder(fastify, steamderId);

  // delete the steamder in the memory
  steamder.sockets.delete(steamderId);
};