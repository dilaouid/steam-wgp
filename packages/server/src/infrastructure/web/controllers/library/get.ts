import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "@entities";
import { APIResponse } from "@utils/response";
import { getPlayerAllLibrary } from "@repositories";

interface getLibraryParams {
    id: [string];
}

type Library = ILibraryGame[]

interface ILibraryGame {
    id: number;
    hidden: boolean | null;
}

export async function getLibrary(request: FastifyRequest<{ Params: getLibraryParams }>, reply: FastifyReply) {
  const fastify = request.server as FastifyInstance;
  try {
    if (!request.user) throw new Error("logged_in_to_access_library");

    const { id: userId } = request.user as Player;

    const libraryObject = await getPlayerAllLibrary(fastify, BigInt(userId));
    const libraryArray = Object.values(libraryObject);
    if (libraryArray.length === 0) {
      return APIResponse(reply, { message: "OK", statusCode: 200 });
    }

    const replyData: Library = libraryArray.map((game) => ({
      id: game.id,
      hidden: game.hidden,
    }));

    return APIResponse(reply, { data: replyData, message: "OK", statusCode: 200 });
  } catch (error: any) {
    const errorMappings: Record<
      string,
      { messageKey: string; statusCode: number }
    > = {
      logged_in_to_access_library: {
        messageKey: "logged_in_to_access_library",
        statusCode: 401,
      },
      invalid_id: {
        messageKey: "invalid_id",
        statusCode: 401,
      },
      default: {
        messageKey: "internal_server_error",
        statusCode: 500,
      },
    };
    const { messageKey, statusCode } = errorMappings[error.message] || errorMappings.default;
    fastify.log.error(error);
    return APIResponse(reply, { message: messageKey, statusCode });
  }
}