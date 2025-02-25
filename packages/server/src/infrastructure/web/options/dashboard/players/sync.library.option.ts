import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { playerController } from "@controllers/dashboard/player.controller";

export const syncLibraryOpts = {
  method: "POST" as HTTPMethods,
  url: "/:player_id/sync-library",
  handler: playerController.syncLibrary,
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
