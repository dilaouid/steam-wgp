import { FastifyInstance } from "fastify";
import { checkGamesInLibrary } from "../../../src/domain/services/libraryService";
import { getPlayerAllLibrary } from "../../../src/@repositories";

jest.mock("../../../src/@repositories");

describe("checkGamesInLibrary", () => {
  let fastify: FastifyInstance;
  let userId: bigint;
  let gameIds: string[];

  beforeEach(() => {
    fastify = {} as FastifyInstance;
    userId = BigInt(1);
    gameIds = ["1", "2", "3"];
  });

  it("should return the library if all gameIds are in the library", async () => {
    const mockLibrary = [
      { id: "1", hidden: false },
      { id: "2", hidden: false },
      { id: "3", hidden: false },
    ];
    (getPlayerAllLibrary as jest.Mock).mockResolvedValue(mockLibrary);

    const result = await checkGamesInLibrary(fastify, userId, gameIds);

    expect(result).toEqual(mockLibrary);
    expect(getPlayerAllLibrary).toHaveBeenCalledWith(fastify, userId);
  });

  it("should throw an error if any gameId is not in the library", async () => {
    const mockLibrary = [
      { id: "1", hidden: false },
      { id: "2", hidden: false },
    ];
    (getPlayerAllLibrary as jest.Mock).mockResolvedValue(mockLibrary);

    await expect(checkGamesInLibrary(fastify, userId, gameIds)).rejects.toThrow(
      "invalid_id"
    );
    expect(getPlayerAllLibrary).toHaveBeenCalledWith(fastify, userId);
  });
});
