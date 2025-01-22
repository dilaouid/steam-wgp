import { getPlayersInfo, getUserInfo } from "@services/playerService";
import { createController } from "@utils/controller";
import { getPlayersQuerySchema, validPlayerId } from "@validations/dashboard";

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
  })
}