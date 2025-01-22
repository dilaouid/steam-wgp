import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { playerController } from "@controllers/dashboard/player.controller";

export const deletePlayerOpts = {
  method: "DELETE" as HTTPMethods,
  url: "/:id",
  handler: playerController.delete,
  schema: {
    params: {
      properties: {
        id: { type: "string" }
      },
    },
  },
  preValidation: [isAdmin],
};