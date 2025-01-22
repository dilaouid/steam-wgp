import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

export const deletePlayerOpts = {
  method: "DELETE" as HTTPMethods,
  url: "/:id",
  handler: () => {},
  schema: {
    params: {
      properties: {
        id: { type: "string" }
      },
    },
  },
  preValidation: [isAdmin],
};