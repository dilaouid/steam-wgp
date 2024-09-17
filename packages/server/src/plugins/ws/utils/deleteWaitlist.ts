import { FastifyInstance } from "fastify";
import { steamders, steamdersPlayers } from "../../../infrastructure/data/schemas";
import { eq } from "drizzle-orm";

export const deleteWaitlist = async (fastify: FastifyInstance, waitlistId: string, winner: number | undefined) => {
  const waitlist: any = fastify.waitlists.get(waitlistId);
  if (!waitlist) return;

  // delete the waitlist in the database
  await fastify.db.update(steamders)
    .set({
      complete: true,
      selected: winner
    }).where(
      eq(steamders.id, waitlistId)
    ).execute();

  // remove all waitlistsplayers from the database for this waitlist
  await fastify.db.delete(steamdersPlayers)
    .where(
      eq(steamdersPlayers.steamder_id, waitlistId)
    ).execute();

  // delete the waitlist in the memory
  waitlist.sockets.delete(waitlistId);
};