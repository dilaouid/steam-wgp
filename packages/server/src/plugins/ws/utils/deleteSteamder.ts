import { FastifyInstance } from "fastify";
import { steamders, steamdersPlayers } from "../../../infrastructure/data/schemas";
import { eq } from "drizzle-orm";

export const deleteSteamder = async (fastify: FastifyInstance, steamderId: string, winner: number | undefined) => {
  const steamder: any = fastify.steamders.get(steamderId);
  if (!steamder) return;

  // delete the steamder in the database
  await fastify.db.update(steamders)
    .set({
      complete: true,
      selected: winner
    }).where(
      eq(steamders.id, steamderId)
    ).execute();

  // remove all steamders players from the database for this steamder
  await fastify.db.delete(steamdersPlayers)
    .where(
      eq(steamdersPlayers.steamder_id, steamderId)
    ).execute();

  // delete the steamder in the memory
  steamder.sockets.delete(steamderId);
};