import { FastifyInstance } from "fastify";
import { SteamWGPStats } from "../../../src/domain/services/globalService";
import {
  countGames,
  countPlayers,
  countSteamders,
  getPopularGames,
} from "../../../src/@repositories";

jest.mock("../../../src/@repositories");

describe("SteamWGPStats", () => {
  let fastify: FastifyInstance;

  beforeEach(() => {
    fastify = {} as FastifyInstance;
  });

  it("should return the correct statistics", async () => {
    (countPlayers as jest.Mock).mockResolvedValue([{ count: 100 }]);
    (countGames as jest.Mock).mockResolvedValue([{ count: 50 }]);
    (countSteamders as jest.Mock).mockImplementation((_, isMatch) =>
      isMatch ? [{ count: 20 }] : [{ count: 10 }]
    );
    (getPopularGames as jest.Mock).mockResolvedValue([
      "Game1",
      "Game2",
      "Game3",
    ]);

    const result = await SteamWGPStats(fastify);

    expect(result).toEqual({
      players: 100,
      games: 50,
      matches: 20,
      steamders: 10,
      podium: ["Game1", "Game2", "Game3"],
    });
  });

  it("should handle empty results", async () => {
    (countPlayers as jest.Mock).mockResolvedValue([{ count: 0 }]);
    (countGames as jest.Mock).mockResolvedValue([{ count: 0 }]);
    (countSteamders as jest.Mock).mockImplementation((_, isMatch) =>
      isMatch ? [{ count: 0 }] : [{ count: 0 }]
    );
    (getPopularGames as jest.Mock).mockResolvedValue([]);

    const result = await SteamWGPStats(fastify);

    expect(result).toEqual({
      players: 0,
      games: 0,
      matches: 0,
      steamders: 0,
      podium: [],
    });
  });

  it("should handle errors gracefully", async () => {
    (countPlayers as jest.Mock).mockRejectedValue(
      new Error("Failed to count players")
    );
    (countGames as jest.Mock).mockRejectedValue(
      new Error("Failed to count games")
    );
    (countSteamders as jest.Mock).mockRejectedValue(
      new Error("Failed to count steamders")
    );
    (getPopularGames as jest.Mock).mockRejectedValue(
      new Error("Failed to get popular games")
    );

    await expect(SteamWGPStats(fastify)).rejects.toThrow(
      "Failed to count players"
    );
  });
});
