import { InferInsertModel, InferSelectModel, and, eq } from "drizzle-orm";
import { pgTable, uuid, integer, bigint, boolean } from "drizzle-orm/pg-core";
import { model as players } from "./Players";
import { model as games } from "./Games";
import { FastifyInstance } from "fastify";
import { Games, Players } from ".";

export const model = pgTable("libraries", {
  id: uuid("id").primaryKey(),
  player_id: bigint("player_id", { mode: "bigint" }).references(() => players.id),
  game_id: integer("game_id").references(() => games.id),
  hidden: boolean("hidden").default(false)
});

export async function getPlayerAllLibrary(fastify: FastifyInstance, playerId: bigint): Promise<Library[]> {
  const result = fastify.db.select({
    id: model.game_id,
    hidden: model.hidden
  }).from(model)
    .leftJoin(Players.model, eq(model.player_id, Players.model.id))
    .leftJoin(Games.model, eq(model.game_id, Games.model.id))
    .where(
      and(
        eq(Players.model.id, playerId),
        eq(Games.model.is_selectable, true)
      )
    ).execute();

  return result;
}

export async function getPlayerLibrary(fastify: FastifyInstance, playerId: bigint): Promise<Library[]> {
  const result = fastify.db.select().from(model)
    .leftJoin(Players.model, eq(model.player_id, Players.model.id))
    .leftJoin(Games.model, eq(model.game_id, Games.model.id))
    .where(
      and(
        eq(Players.model.id, playerId),
        eq(Games.model.is_selectable, true),
        eq(model.hidden, false)
      )
    ).execute();

  return result;
}

export type Library = InferSelectModel<typeof model>;
export type LibraryInsert = InferInsertModel<typeof model>;