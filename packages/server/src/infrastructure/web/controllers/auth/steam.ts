import { FastifyReply, FastifyRequest } from "fastify";
import { APIResponse } from "@utils//response";

/**
 * Handles the steam endpoint.
 *
 * @param request - The FastifyRequest object.
 * @param reply - The FastifyReply object.
 * @returns A Promise that resolves to an API response.
 */
export const steam = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.user)
    return APIResponse(reply, null, "logged_in_to_view_profile", 401);
  return APIResponse(reply, request.user, "logged_in", 200);
};