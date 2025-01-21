import { FastifyReply } from "fastify";
import pc from "picocolors";

import { HttpError } from "domain/HttpError";
import { logger } from "@plugins/logger.plugin";
import { z } from "zod";

export interface IError {
  field: string;
  message: string;
}

export interface INormalized {
  statusCode: number;
  message: string;
  data?: string[] | object | null | IError[];
}

/**
 * APIResponse function is responsible for sending an API response with the specified data, message, and status code.
 *
 * @param {FastifyReply} res - The FastifyReply object.
 * @param {any} data - The data to be included in the response.
 * @param {string} message - The message to be included in the response.
 * @param {number} status - The status code of the response. Default is 200.
 */
export const APIResponse = (res: FastifyReply, normalized: INormalized) => {
  const { statusCode, data, message } = normalized;
  return res.code(statusCode).send({ data, message });
};

/**
 * Transforms a ZodError into a normalized error response object.
 *
 * @param error - The ZodError object containing validation errors.
 * @returns An object containing the status code, a message indicating the form is incorrect, and the detailed error data.
 */
export const zodErrorResponse = (error: z.ZodError): INormalized => {
  const data = error.errors.map((err) => {
    return {
      field: err.path.join("."),
      message: err.message
    };
  });
  return {
    statusCode: 400,
    message: "Le formulaire est incorrect",
    data
  };
};

/**
 * Generates a normalized error response based on the type of error provided.
 *
 * @param error - The error object which can be an instance of HttpError, ZodError, or any other unknown error type.
 * @returns An object conforming to the INormalized interface containing the status code, message, and additional data if available.
 */
export const errorResponse = (error: unknown): INormalized => {
  let normalized: INormalized;
  if (error instanceof HttpError) {
    logger.error(pc.red(`🛑 Error [${error.statusCode}]: ${error.message}`));
    if (error.additionalInfo) {
      logger.error(pc.yellow(`📋 Additional info: ${JSON.stringify(error.additionalInfo, null, 2)}`));
    }
    normalized = {
      statusCode: error.statusCode,
      message: error.message,
      data: error.additionalInfo
    };
  } else if (error instanceof z.ZodError) {
    normalized = zodErrorResponse(error);
  } else {
    logger.error(pc.red(`💥 Unexpected error: ${JSON.stringify(error, null, 2)}`));
    normalized = {
      statusCode: 500,
      message: "Une erreur est survenue"
    };
  }
  return normalized;
};


/**
 * Sets the headers for Server-Sent Events (SSE) response.
 *
 * @param origin - The origin value for the 'Access-Control-Allow-Origin' header.
 * @returns The headers object with the SSE headers set.
 */
export const setSSEHeaders = (origin: string) => {
  return {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true'
  };
};