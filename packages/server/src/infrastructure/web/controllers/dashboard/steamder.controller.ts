import { deleteSteamderById, getSteamderById, getSteamdersInfo } from "@services/steamderService";
import { createController } from "@utils/controller";
import { getSteamdersQuerySchema, validSteamderId } from "@validations/dashboard/steamders.validations";
import { uuidSchema } from "@validations/typeValidation";

export const steamderController = {
  delete: createController(async ({ fastify, params }) => {
    const id = uuidSchema.parse(params);

    await deleteSteamderById(fastify, id);
    return {
      message: "steamder_deleted",
      statusCode: 200
    };
  }),
  get: createController(async ({ fastify, params }) => {
    const { steamder_id } = validSteamderId.parse(params);

    const steamder = await getSteamderById(fastify, steamder_id);
    return {
      data: steamder,
      message: "steamder_retrieved",
      statusCode: 200
    };
  }),
  list: createController(async ({ fastify, query }) => {
    const validatedQuery = getSteamdersQuerySchema.parse(query);
    const data = await getSteamdersInfo(fastify, validatedQuery);

    return {
      message: "OK",
      data,
      statusCode: 200
    }
  }),
  /* update: createController(async ({ fastify, params, body }) => {

  }) */
};