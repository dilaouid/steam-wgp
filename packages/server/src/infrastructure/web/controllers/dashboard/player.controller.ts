import { deleteUser, getPlayersInfo, getUserInfo, update } from "@services/playerService";
import { createController } from "@utils/controller";
import { getPlayersQuerySchema, updatePlayerBodySchema, validPlayerId } from "@validations/dashboard";

export const playerController = {
  get: createController(async ({ fastify, params }) => {
    const { player_id } = validPlayerId.parse(params);
    const data = await getUserInfo(fastify, player_id);

    return {
      message: "OK",
      data,
      statusCode: 200
    }
  }),

  list: createController(async ({ fastify, query }) => {
    const validatedQuery = getPlayersQuerySchema.parse(query);
    const data = await getPlayersInfo(fastify, validatedQuery);

    return {
      message: "OK",
      data,
      statusCode: 200
    }
  }),

  delete: createController(async ({ fastify, params }) => {
    const { player_id } = validPlayerId.parse(params);
    await deleteUser(fastify, player_id);

    return {
      message: "player_deleted",
      statusCode: 200
    };
  }),

  update: createController(async ({ fastify, params, body }) => {
    const { player_id } = validPlayerId.parse(params);
    const data = updatePlayerBodySchema.parse(body);
    await update(fastify, player_id, data);

    return {
      message: "player_updated",
      statusCode: 200
    };
  }),
}