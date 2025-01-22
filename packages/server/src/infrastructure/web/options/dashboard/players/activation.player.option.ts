import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

export const SwitchActivationPlayerOpts = {
  method: "PUT" as HTTPMethods,
  url: "/activation/:id",
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