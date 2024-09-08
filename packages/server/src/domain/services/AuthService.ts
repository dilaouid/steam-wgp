import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { Player } from "../entities";
import { getPlayerWaitlist, isUserDeleted, unDeleteUser } from "../../infrastructure/repositories";

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
  const [ playerWaitlist ] = await getPlayerWaitlist(fastify, playerId) || null;
  return playerWaitlist?.id ?? null;
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
  return reply.redirect(
    `${config.FRONT}/login${config.NOT_SAME_ORIGIN ? "?token=" + jwtToken : ""}`
  );
};

/**
 * Checks if a user is deleted and performs necessary actions based on the result.
 * @param fastify - The Fastify instance.
 * @param playerId - The ID of the player.
 * @throws {Error} - Throws an error if the user is recently deleted.
 */
export const checkUserDeleted = async (
  fastify: FastifyInstance,
  playerId: bigint
) => {
  const status = await isUserDeleted(fastify, playerId);
  if (status.isDeleted && status.remainingTime > 0) {
    fastify.log.warn(`User ${playerId} is in the deletedusers table, he can't login yet`);
    const remainingHours = Math.ceil(status.remainingTime / 1000 / 60 / 60);
    throw new Error(`You cannot login yet, since you have deleted your account recently, please wait ${remainingHours} more hours`);
  } else if (!status.isDeleted) {
    fastify.log.info(`User ${playerId} is not in the deletedusers table`);
  } else if (status.isDeleted && status.remainingTime === 0) {
    fastify.log.info(`User ${playerId} is in the deletedusers table, but he can login now`);
    await unDeleteUser(fastify, playerId);
  }
};
