import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { playerController } from "@controllers/dashboard/player.controller";

export const getPlayersOpts = {
  method: "GET" as HTTPMethods,
  url: "/",
  handler: playerController.list,
  schema: {
    querystring: {
      type: "object",
      properties: {
        page: {
          type: "integer",
          minimum: 1,
          default: 1,
          description: "Page number"
        },
        limit: {
          type: "integer",
          minimum: 1,
          maximum: 100,
          default: 20,
          description: "Number of items per page"
        },
        search: {
          type: "string",
          minLength: 1,
          description: "Search by username"
        },
        sort_field: {
          type: "string",
          enum: ["username", "steamders_completed", "library_size", "created_at"],
          description: "Field to sort by"
        },
        sort_order: {
          type: "string",
          enum: ["asc", "desc"],
          default: "asc",
          description: "Sort order"
        },
        is_admin: {
          type: "string",
          enum: ["true", "false"],
          description: "Filter by admin status"
        },
        has_active_steamder: {
          type: "string",
          enum: ["true", "false"],
          description: "Filter by active steamder participation"
        },
        min_games: {
          type: "integer",
          minimum: 0,
          description: "Minimum number of games in library"
        }
      }
    },
  },
  preValidation: [isAdmin],
};
