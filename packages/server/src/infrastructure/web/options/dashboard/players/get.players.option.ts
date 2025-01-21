import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

export const getPlayersOpts = {
  method: "GET" as HTTPMethods,
  url: "/players",
  handler: () => {},
  schema: {
    querystring: {
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
