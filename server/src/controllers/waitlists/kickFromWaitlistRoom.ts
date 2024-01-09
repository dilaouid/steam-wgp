import { FastifyInstance, FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { Player } from "../../models/Players";
import { isAuthenticated } from "../../auth/mw";
import { APIResponse } from "../../utils/response";
import { and, eq } from "drizzle-orm";
import { Waitlists, WaitlistsPlayers } from "../../models";
import i18next from "../../plugins/i18n.plugin";

interface Parameters {
    roomId: string;
    playerId: string;
}

export const kickFromWaitlistOpts = {
  method: 'DELETE' as HTTPMethods,
  url: '/:roomId/kick/:playerId',
  handler: kickFromWaitlist,
  schema: {
    params: {
      type: 'object',
      required: ['roomId', 'playerId'],
      properties: {
        roomId: { type: 'string' },
        playerid: { type: 'string' }
      }
    }
  },
  preValidation: [isAuthenticated]
};

async function kickFromWaitlist(request: FastifyRequest, reply: FastifyReply) {
  const { id } = (request.user as Player);
  const { roomId, playerId } = (request.params as Parameters);

  const fastify = request.server as FastifyInstance;

  if (!id)
    return APIResponse(reply, null, i18next.t('need_to_be_logged_in', { lng: request.userLanguage }), 401);
  try {

    // check if the user is in admin of the waitlist and the playerid is in the waitlist
    const waitlist = await fastify.db.select().from(Waitlists.model).where(
      and(
        eq(Waitlists.model.id, roomId),
        eq(Waitlists.model.admin_id, id)
      ))
      .leftJoin(WaitlistsPlayers.model,
        and(
          eq(WaitlistsPlayers.model.waitlist_id, roomId),
          eq(WaitlistsPlayers.model.player_id, BigInt(playerId))
        )
      )
      .execute();

    if (waitlist.length === 0) {
      return APIResponse(reply, null, i18next.t('not_room_admin', { lng: request.userLanguage }), 401);
    }

    // remove the player from the waitlist
    await fastify.db.delete(WaitlistsPlayers.model).where(
      and(
        eq(WaitlistsPlayers.model.waitlist_id, roomId),
        eq(WaitlistsPlayers.model.player_id, BigInt(playerId))
      )
    ).execute();

    return APIResponse(reply, null, i18next.t('kicked_player', { lng: request.userLanguage }), 200);

  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, i18next.t('internal_server_error', { lng: request.userLanguage }), 500);
  }
}