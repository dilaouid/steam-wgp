import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { steamderController } from "@controllers/dashboard/steamder.controller";

/**
 * Options for listing all the Steamders existing.
 * Route: GET - /steamders
 * @example fastify.route(getAllSteamdersOpts);
 */
export const getAllSteamdersOpts = {
  method: "GET" as HTTPMethods,
  url: "/",
  handler: steamderController.list,
  schema: {
    querystring: {
      type: "object",
      properties: {
        page: {
          type: "number",
          minimum: 1,
          default: 1
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 100,
          default: 20
        },
        sort_field: {
          type: "string",
          enum: ["name", "players_count", "created_at"]
        },
        sort_order: {
          type: "string",
          enum: ["asc", "desc"],
          default: "asc"
        },
        search: {
          type: "string"
        },
        is_private: {
          type: "boolean"
        },
        is_complete: {
          type: "boolean"
        }
      },
    },
  },
  preValidation: [isAdmin]
};
