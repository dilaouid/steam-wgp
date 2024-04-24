import { FastifyInstance, FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { DeletedUsers, Libraries, Players, WaitlistsPlayers } from "../../models";
import { eq } from 'drizzle-orm';
import { Player } from "../../models/Players";
import { APIResponse } from "../../utils/response";
import { isAuthenticated } from "../../auth/mw";

export const deleteUserOpts = {
  method: 'DELETE' as HTTPMethods,
  url: '/',
  handler: deleteUser,
  preValidation: [isAuthenticated],
  schema : {
    querystring: {
      token: { type: 'string' },
      lang: { type: 'string' }
    }
  }
};

async function deleteUser(request: FastifyRequest, response: FastifyReply) {
  const fastify = request.server as FastifyInstance;
  const { id } = (request.user as Player);
  try {
    // if user is in a waitlist, send him an error
    const inWaitlist = await fastify.db.select()
      .from(WaitlistsPlayers.model)
      .where(
        eq(WaitlistsPlayers.model.player_id, id)
      ).execute();

    if (inWaitlist.length > 0)
      return APIResponse(response, null, 'user_in_waitlist_cannot_kick', 400);

    // delete every Library entry for the user
    await fastify.db.delete(Libraries.model)
      .where(
        eq(Libraries.model.player_id, id)
      ).execute();

    // delete the user
    await fastify.db.delete(Players.model)
      .where(
        eq(Players.model.id, id)
      ).execute();

    // insert the user to the deletedusers table
    await fastify.db.insert(DeletedUsers.model)
      .values({
        id: id
      }).onConflictDoNothing(
      ).execute();

    return APIResponse(response, null, 'user_deleted', 200);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(response, null, 'Internal server error', 500);
  }
}