import { Controller, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse, errorResponse } from "./response";

export const createController = (controller: Controller) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const fastify = req.server as FastifyInstance;
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
      fastify.log.error(err);
      APIResponse(res, errorResponse(err));
    }
  };
};