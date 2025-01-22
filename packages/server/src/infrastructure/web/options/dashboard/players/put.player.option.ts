import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { playerController } from "@controllers/dashboard/player.controller";

export const updatePlayerOpts = {
  method: "PUT" as HTTPMethods,
  url: "/:id",
  handler: playerController.update,
  schema: {
    query: {
      type: "object",
      properties: {
        id: { type: "string" },
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
