import { FastifyInstance } from "fastify";
import { families, players } from "@schemas";
import { eq } from "drizzle-orm";

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
        id: families.family_member,
        username: players.username,
        avatar_hash: players.avatar_hash,
        profileurl: players.profileurl,
      })
      .from(families)
      .leftJoin(players, eq(families.family_member, players.id))
      .where(eq(families.player_id, playerId))
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

    const [ familyMembers ] = await getFamilyMembers(fastify, playerId);
    if (familyMembers.length >= 5)
      throw new Error("Player already has 5 family members");
    if (familyMembers.some((member: any) => member.id === familyMemberId))
      throw new Error("Player is already in family");
    return db
      .insert(families)
      .values({ player_id: playerId, family_member: familyMemberId })
      .execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error(
      `Failed to add family member ${familyMemberId} to player ${playerId}`
    );
  }
}