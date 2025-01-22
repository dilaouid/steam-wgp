import { Controller, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import pc from "picocolors";
import { APIResponse, errorResponse } from "./response";


export const createController = (controller: Controller) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const fastify = req.server as FastifyInstance;
    fastify.log.debug(pc.greenBright(`Request received by ${req.ip}`))
    fastify.log.debug(pc.bgYellowBright(`[${req.method}]`) + pc.bgBlue(` - ${req.url}`));
    try {
      const result = await controller({
        fastify,
        query: req.query,
        params: req.params,
        body: req.body
      });

      return APIResponse(res, {
        statusCode: result.statusCode || 200,
        data: result.data,
        message: result.message
      });
    } catch (err: any) {
      APIResponse(res, errorResponse(err));
    }
  };
};