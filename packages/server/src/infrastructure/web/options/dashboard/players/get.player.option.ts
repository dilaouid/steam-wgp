import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { playerController } from "@controllers/dashboard/player.controller";

export const getPlayerOpts = {
  method: "GET" as HTTPMethods,
  url: "/:player_id",
  handler: playerController.get,
  schema: {
    params: {
      type: "object",
      properties: {
        player_id: { type: "string" }
      },
    },
  },
  preValidation: [isAdmin],
};
