import { FastifyInstance } from "fastify";
import { Waitlists, WaitlistsPlayers } from "../../../models";
import { eq } from "drizzle-orm";

export const deleteWaitlist = async (fastify: FastifyInstance, waitlistId: string, winner: number | undefined) => {
  const waitlist: any = fastify.waitlists.get(waitlistId);
  if (!waitlist) return;

  // delete the waitlist in the database
  await fastify.db.update(Waitlists.model)
    .set({
      complete: true,
      selected: winner
    }).where(
      eq(Waitlists.model.id, waitlistId)
    ).execute();

  // remove all waitlistsplayers from the database for this waitlist
  await fastify.db.delete(WaitlistsPlayers.model)
    .where(
      eq(WaitlistsPlayers.model.waitlist_id, waitlistId)
    ).execute();

  // delete the waitlist in the memory
  waitlist.sockets.delete(waitlistId);
};