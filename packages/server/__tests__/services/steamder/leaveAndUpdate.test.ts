import { FastifyInstance } from "fastify";
import { leaveAndUpdateSteamder } from "../../../src/domain/services/steamderService";
import {
  isPlayerInSteamder,
  deleteSteamder,
  leaveSteamder
} from "../../../src/@repositories";

import { updateGameLists } from "../../../src/domain/services/steamderService"

jest.mock("../../../src/@repositories");

describe("leaveAndUpdateSteamder", () => {
  let fastify: FastifyInstance;

  beforeEach(() => {
    fastify = {
      log: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
      },
    } as unknown as FastifyInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 404 if player is not in the steamder", async () => {
    (isPlayerInSteamder as jest.Mock).mockResolvedValue([null]);

    const result = await leaveAndUpdateSteamder(
      fastify,
      "steamderId",
      BigInt(1)
    );

    expect(result).toEqual({
      success: false,
      message: "room_does_not_exist",
      status: 404,
    });
    expect(fastify.log.warn).toHaveBeenCalledWith(
      "Player 1 not found in steamder steamderId"
    );
  });

  it("should return 400 if steamder has already started", async () => {
    (isPlayerInSteamder as jest.Mock).mockResolvedValue([
      { steamders: { started: true } },
    ]);

    const result = await leaveAndUpdateSteamder(
      fastify,
      "steamderId",
      BigInt(1)
    );

    expect(result).toEqual({
      success: false,
      message: "room_already_started",
      status: 400,
    });
    expect(fastify.log.warn).toHaveBeenCalledWith(
      "Steamder steamderId already started"
    );
  });

  it("should delete steamder if player is the admin", async () => {
    (isPlayerInSteamder as jest.Mock).mockResolvedValue([
      { steamders: { admin_id: BigInt(1) } },
    ]);
    (deleteSteamder as jest.Mock).mockResolvedValue(true);

    const result = await leaveAndUpdateSteamder(
      fastify,
      "steamderId",
      BigInt(1)
    );

    expect(result).toEqual({
      success: true,
      message: "left_the_room",
      status: 200,
    });
    expect(fastify.log.warn).toHaveBeenCalledWith(
      "Player 1 is the admin of steamder steamderId"
    );
    expect(deleteSteamder).toHaveBeenCalledWith(fastify, "steamderId");
  });

  it("should remove player from steamder and update game lists", async () => {
    (isPlayerInSteamder as jest.Mock).mockResolvedValue([
      { steamders: { admin_id: BigInt(2) } },
    ]);
    (leaveSteamder as jest.Mock).mockResolvedValue(true);
    (updateGameLists as jest.Mock).mockResolvedValue(true);

    const result = await leaveAndUpdateSteamder(
      fastify,
      "steamderId",
      BigInt(1)
    );

    expect(result).toEqual({
      success: true,
      message: "left_the_room",
      status: 200,
    });
    expect(fastify.log.info).toHaveBeenCalledWith(
      "It's possible to leave the steamder steamderId"
    );
    expect(leaveSteamder).toHaveBeenCalledWith(
      fastify,
      BigInt(1),
      "steamderId"
    );
    expect(updateGameLists).toHaveBeenCalledWith(fastify, "steamderId");
  });

  it("should return 500 if an error occurs", async () => {
    (isPlayerInSteamder as jest.Mock).mockRejectedValue(
      new Error("Test error")
    );

    const result = await leaveAndUpdateSteamder(
      fastify,
      "steamderId",
      BigInt(1)
    );

    expect(result).toEqual({
      success: true,
      message: "internal_server_error",
      status: 500,
    });
    expect(fastify.log.error).toHaveBeenCalledWith(
      "------- Error in leaveAndUpdateSteamder -------"
    );
    expect(fastify.log.error).toHaveBeenCalledWith(new Error("Test error"));
  });
});
