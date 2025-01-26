import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { playerController } from "@controllers/dashboard/player.controller";

export const updatePlayerOpts = {
  method: "PUT" as HTTPMethods,
  url: "/:player_id",
  handler: playerController.update,
  schema: {
    params: {
      type: "object",
      properties: {
        player_id: { type: "string" },
      },
    },
    body: {
      type: "object",
      properties: {
        avatar_hash: { type: "string" },
        username: { type: "string" },
        profileurl: { type: "string" },
        isAdmin: { type: "boolean" }
      },
    },
  },
  preValidation: [isAdmin],
};
