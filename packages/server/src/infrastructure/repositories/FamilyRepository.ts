import { FastifyInstance } from "fastify";
import { families, familyMembers, players } from "@schemas";
import { eq } from "drizzle-orm";

/**
 * Check if a player is in a family (in the family_member column, not the family_admin column).
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the player is in a family, false otherwise.
 * @throws {Error} - If there is an error while checking if the player is in a family.
 */
export const isPlayerInFamily = async (fastify: FastifyInstance, playerId: bigint) => {
  try {
    const { db } = fastify;
    const [ family ] = await db
      .select(players.id)
      .from(familyMembers)
      .where(eq(familyMembers.player_id, playerId))
      .limit(1)
      .execute();
    return !!family;
  } catch (err) {
    fastify.log.error(err);
    throw new Error(`Failed to check if player ${playerId} is in a family`);
  }
}

/**
 * Retrieves the family members of a player.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player whose family members to retrieve.
 * @returns {Promise<bigint[]>} - A promise that resolves to an array of family member IDs.
 * @throws {Error} - If there is an error while retrieving the family members.
 */
export const getFamilyMembers = async (fastify: FastifyInstance, playerId: bigint) => {
  try {
    const { db } = fastify;
    return await db
      .select({
        id: players.id,
        username: players.username,
        avatar_hash: players.avatar_hash,
        profileurl: players.profileurl,
        status: familyMembers.status
      })
      .from(familyMembers)
      .leftJoin(players, eq(familyMembers.player_id, players.id))
      .where(eq(familyMembers.player_id, playerId))
      .execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error(`Failed to retrieve family members for player ${playerId}`);
  }
}

/**
 * Add a family member to a player's family (max 5 members).
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player to add a family member to.
 * @param {bigint} familyMemberId - The ID of the family member to add.
 * @returns {Promise<any>} - A promise that resolves when the family member is added.
 * @throws {Error} - If there is an error while adding the family member.
 * @throws {Error} - If the player already has 5 family members.
 * @throws {Error} - If the player is trying to add themselves as a family member.
 * @throws {Error} - If the player is trying to add a family member that is already in their family.
 */
export const addFamilyMember = async (fastify: FastifyInstance, playerId: bigint, familyMemberId: bigint) => {
  try {
    const { db } = fastify;
    if (playerId === familyMemberId)
      throw new Error("Player cannot add themselves to family");

    const isInFamily = await isPlayerInFamily(fastify, familyMemberId);
    if (isInFamily)
      throw new Error("Family member is already in a family");

    const isPlayerAFamilyMember = await isPlayerInFamily(fastify, playerId);
    if (isPlayerAFamilyMember)
      throw new Error("You cannot add a family member if you're not a family admin");

    const [ familyMembers ] = await getFamilyMembers(fastify, playerId);
    if (familyMembers.length >= 5)
      throw new Error("The family is full (5 members)");
    if (familyMembers.some((member: any) => member.id === familyMemberId))
      throw new Error("Player is already in family");
    return db
      .insert(families)
      .values({ family_admin: playerId, family_member: familyMemberId })
      .execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error(
      `Failed to add family member ${familyMemberId} to player ${playerId}`
    );
  }
}