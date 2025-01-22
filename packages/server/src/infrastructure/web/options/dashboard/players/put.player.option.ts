import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

export const updatePlayerOpts = {
  method: "PUT" as HTTPMethods,
  url: "/:id",
  handler: () => {},
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
