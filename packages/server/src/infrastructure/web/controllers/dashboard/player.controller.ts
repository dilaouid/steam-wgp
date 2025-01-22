import { getUserInfo } from "@services/playerService";
import { createController } from "@utils/controller";
import { validPlayerId } from "@validations/dashboard";

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
}