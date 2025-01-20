import { HTTPMethods } from "fastify";
import { isAuthenticated } from "@auth/middlewares";
import { getLibrary } from "@controllers/library";

export const getLibraryOpts = {
  method: "GET" as HTTPMethods,
  url: "/",
  handler: getLibrary,
  preValidation: [isAuthenticated],
};
