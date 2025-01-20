import { HTTPMethods } from "fastify";
import { loadLibrary } from "@controllers/player/loginLoad";

export const getSteamLibraryOpts = {
  method: 'GET' as HTTPMethods,
  url: '/library-checker',
  handler: loadLibrary,
  schema : {
    querystring: {
      type: "object",
      properties: {
        token: { type: 'string' }
      }
    }
  }
};