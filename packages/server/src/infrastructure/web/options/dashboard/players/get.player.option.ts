import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

export const getPlayerOpts = {
  method: "GET" as HTTPMethods,
  url: "/players/:id",
  handler: () => {},
  schema: {
    query: {
      type: "object",
      properties: {
        id: { type: "uuid" }
      },
    },
  },
  preValidation: [isAdmin],
};
