import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

export const getGamesOpts = {
  method: "GET" as HTTPMethods,
  url: "/",
  handler: () => {},
  schema: {
    querystring: {
      type: "object",
      properties: {
        page: { type: "number" },
        limit: { type: "number" },
        search: { type: "string" },
        sort: { type: "string" },
        order: { type: "string" },
      },
    },
  },
  preValidation: [isAdmin],
};
