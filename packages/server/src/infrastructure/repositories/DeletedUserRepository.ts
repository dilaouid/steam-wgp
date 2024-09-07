import { FastifyInstance } from "fastify";
import { deletedUsers } from "../data/schemas";
import { eq, sql } from "drizzle-orm";

/**
 * Checks if a user is deleted.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} id - The ID of the user to check.
 * @returns {Promise<{ isDeleted: boolean; remainingTime: number }>} - A promise that resolves to the user's delete date.
 * @throws {Error} - If there is an error while checking if the user is deleted.
 */
export const isUserDeleted = async (fastify: FastifyInstance, id: bigint): Promise<{ isDeleted: boolean; remainingTime: number }> => {
  try {
    const { db } = fastify;
    const prepared = db
      .select({
        isDeleted: sql`CASE WHEN ${deletedUsers.delete_date} IS NOT NULL AND (EXTRACT(EPOCH FROM NOW()) * 1000 - EXTRACT(EPOCH FROM ${deletedUsers.delete_date}) * 1000) <= 172800000 THEN true ELSE false END`,
        remainingTime: sql`CASE WHEN ${deletedUsers.delete_date} IS NOT NULL THEN GREATEST(0, 172800000 - (EXTRACT(EPOCH FROM NOW()) * 1000 - EXTRACT(EPOCH FROM ${deletedUsers.delete_date}) * 1000)) ELSE 0 END`
      })
      .from(deletedUsers)
      .where(eq(deletedUsers.id, sql.placeholder("id")))
      .limit(1)
      .prepare("checkUserDeletedStatusStatement");
    const result = await prepared.execute({ id });
    return result[0] ?? { isDeleted: false, remainingTime: 0 };
  } catch (err) {
    fastify.log.error(err);
    throw new Error(`Failed to check if user ${id} is deleted`);
  }
};

/**
 * Undeletes a user by their ID.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} id - The ID of the user to undelete.
 * @returns {Promise<any>} - A promise that resolves when the user is undeleted.
 * @throws {Error} - If there is an error while undeleting the user.
 */
export const undeleteUser = async (fastify: FastifyInstance, id: bigint) => {
  try {
    const { db } = fastify;
    return db.delete(deletedUsers).where(eq(deletedUsers.id, id)).execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to undelete user " + id);
  }
};

/**
 * Deletes a user from the database.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} id - The ID of the user to delete.
 * @returns {Promise<any>} - A promise that resolves when the user is deleted.
 * @throws {Error} - If there is an error while deleting the user.
 */
export const deleteUser = async (fastify: FastifyInstance, id: bigint) => {
  try {
    const { db } = fastify;
    return db
      .insert(deletedUsers)
      .values({ id })
      .onConflictDoNothing()
      .execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to delete user " + id);
  }
};
