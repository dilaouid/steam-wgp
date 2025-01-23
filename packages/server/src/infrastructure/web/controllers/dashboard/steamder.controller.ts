import { deleteSteamderById, getSteamderById, getSteamdersInfo, kickPlayerFromSteamder, updateSteamderInformations } from "@services/steamderService";
import { createController } from "@utils/controller";

import { getSteamdersQuerySchema, updateSteamderSchema, validKickSteamderId, validSteamderId } from "@validations/dashboard/steamders.validations";
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

  kick: createController(async ({ fastify, params }) => {
    const { steamder_id, player_id } = validKickSteamderId.parse(params);

    await kickPlayerFromSteamder(fastify, steamder_id, player_id);
    return {
      message: "player_kicked",
      statusCode: 200
    };
  }),

  update: createController(async ({ fastify, params, body }) => {
    const { steamder_id } = validSteamderId.parse(params);
    const { name, private_steamder, complete, selected, display_all_games } = updateSteamderSchema.parse(body);

    await updateSteamderInformations(fastify, steamder_id, { name, private_steamder, complete, selected, display_all_games });
    return {
      message: "steamder_updated",
      statusCode: 200
    }
  })
};