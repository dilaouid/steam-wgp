import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse } from "../../../utils/response";
import { getUserWaitlist, login, logout } from "../../../domain/services/AuthService";
import { Player } from "../../../models/Players";

export const steam = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.user)
    return APIResponse(reply, null, "logged_in_to_view_profile", 401);
  return APIResponse(reply, request.user, "logged_in", 200);
};

export const steamCallback = (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
  return login(fastify, reply, request);
}

export const logoutUser = (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
  logout(fastify, reply, request);
  return APIResponse(reply, null, 'logged_out', 200);
};

export const getMe = (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.user)
    return APIResponse(reply, null, "logged_in_to_view_profile", 401);
  const user = request.user as Player & { username: string };
  const waitlist = await getUserWaitlist(fastify, BigInt(user.id));
  return APIResponse(reply, { id: user.id, username: user.username, waitlist, avatar_hash: user.avatar_hash }, 'logged_in', 200);
};