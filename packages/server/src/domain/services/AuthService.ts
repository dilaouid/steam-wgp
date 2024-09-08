import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { Player } from "../entities";
import { getPlayerWaitlist } from "../../infrastructure/repositories";

type User = Player & { username: string };

/**
 * Retrieves the user waitlist for a given player ID.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player.
 * @returns {Promise<any>} - A promise that resolves to the user waitlist.
 */
export const getUserWaitlist = async (
  fastify: FastifyInstance,
  playerId: bigint
) => {
  const [playerWaitlist] = (await getPlayerWaitlist(fastify, playerId)) || null;
  return playerWaitlist.id;
};

/**
 * Logs out the user and clears the authentication token cookie.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param reply - The Fastify reply object.
 * @param request - The Fastify request object.
 */
export const logout = async (
  fastify: FastifyInstance,
  reply: FastifyReply,
  request: FastifyRequest
) => {
  request.logOut();
  reply.clearCookie("token", {
    path: "/",
    domain:
      process.env.NODE_ENV === "production" ? fastify.config.DOMAIN : undefined,
  });
};

/**
 * Logs in a user and sets a JWT token as a cookie.
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param reply - The Fastify reply object.
 * @param request - The Fastify request object.
 */
export const login = async (
  fastify: FastifyInstance,
  reply: FastifyReply,
  request: FastifyRequest
) => {
  if (!request.user) throw new Error("Missing user object in request");
  const user = request.user as User;
  const { config } = fastify;
  const jwtToken = jwt.sign(
    {
      id: String(user.id),
      username: user.username,
      avatar_hash: user.avatar_hash,
    },
    fastify.config.SECRET_KEY,
    { expiresIn: "5h" }
  );
  reply.setCookie("token", jwtToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 18000,
    sameSite: process.env.NODE_ENV === "production" ? "none" : true,
    domain:
      process.env.NODE_ENV === "production" ? fastify.config.DOMAIN : undefined,
  });
  return reply.redirect(`${config.FRONT}/login${config.NOT_SAME_ORIGIN ? '?token=' + jwtToken : ''}`);
};
