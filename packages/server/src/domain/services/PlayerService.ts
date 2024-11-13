import { FastifyInstance } from "fastify";
import {
  getPlayerAccordingToId,
  insertPlayer,
  updatePlayer,
} from "@repositories";
import { Player } from "@entities";

/**
 * Updates the avatar hash for a player.
 *
 * @param fastify - The Fastify instance.
 * @param id - The ID of the player.
 * @param currentHash - The current avatar hash.
 * @param avatarHash - The new avatar hash.
 */
export const updateAvatarHash = async (
  fastify: FastifyInstance,
  id: bigint,
  currentHash: string,
  avatarHash: string
) => {
  if (currentHash !== avatarHash) {
    fastify.log.info(`Updating avatar hash for ${id}`);
    await updatePlayer(fastify, id, { avatar_hash: avatarHash });
  }
};

/**
 * Updates the username for a player.
 *
 * @param fastify - The Fastify instance.
 * @param id - The ID of the player.
 * @param currentUsername - The current username of the player.
 * @param username - The new username to update.
 */
export const updateUsername = async (
  fastify: FastifyInstance,
  id: bigint,
  currentUsername: string,
  username: string
) => {
  if (currentUsername !== username) {
    fastify.log.info(`Updating username for ${id}`);
    await updatePlayer(fastify, id, { username });
  }
};

/**
 * Updates the profile URL for a player.
 *
 * @param fastify - The Fastify instance.
 * @param id - The ID of the player.
 * @param currentProfileUrl - The current profile URL of the player.
 * @param profileUrl - The new profile URL to update.
 * @returns A promise that resolves when the profile URL is updated.
 */
export const updateProfileUrl = async (
  fastify: FastifyInstance,
  id: bigint,
  currentProfileUrl: string,
  profileUrl: string
) => {
  if (currentProfileUrl !== profileUrl) {
    fastify.log.info(`Updating profile URL for ${id}`);
    await updatePlayer(fastify, id, { profileurl: profileUrl });
  }
};

export const updateNewData = async (
  fastify: FastifyInstance,
  id: bigint,
  data: Partial<Player>,
  newData: { personaname: string; avatarhash: string; profileurl: string }
) => {
  fastify.log.warn("User already exists");
  await updateAvatarHash(
    fastify,
    id,
    data.avatar_hash as string,
    newData.avatarhash as string
  );
  await updateUsername(
    fastify,
    id,
    data.username as string,
    newData.personaname as string
  );
  await updateProfileUrl(
    fastify,
    id,
    data.profileurl as string,
    newData.profileurl as string
  );
};

export const retrieveUserById = async (
  fastify: FastifyInstance,
  id: bigint,
  player: { personaname: string; avatarhash: string; profileurl: string }
) => {
  const [user] = await getPlayerAccordingToId(fastify, id);
  if (!user) {
    fastify.log.info("Inserting new user");
    const [newUser] = await insertPlayer(fastify, { id, avatar_hash: player.avatarhash, username: player.personaname, profileurl: player.profileurl }, [
      "id",
      "avatar_hash",
    ]);
    return newUser;
  } else {
    fastify.log.warn("User already exists");
    await updateNewData(fastify, id, user, player);
    return user;
  }
};
