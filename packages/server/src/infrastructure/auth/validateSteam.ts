import { FastifyInstance } from "fastify";
import { checkUserDeleted } from "../../domain/services/AuthService";
import { retrieveUserById } from "../../domain/services/PlayerService";
import { Player } from "../../domain/entities";

export const validateSteam = async (
  fastify: FastifyInstance,
  identifier: string,
  profile: any,
  done: (err: Error | null, user: Player | null) => void
) => {
  try {
    const player = profile._json;
    if (!player) {
      return done(null, null);
    }

    const userId = BigInt(player.steamid);

    // Check if the user is not in the deleted users table
    await checkUserDeleted(fastify, userId);

    // Retrieve or update the user in the database
    const user = await retrieveUserById(fastify, userId, player);

    return done(null, user);
  } catch (err) {
    fastify.log.error(err);
    return done(err as Error, null);
  }
};
