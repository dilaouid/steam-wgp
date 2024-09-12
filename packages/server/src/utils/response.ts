import { FastifyReply } from "fastify";

/**
 * APIResponse function is responsible for sending an API response with the specified data, message, and status code.
 *
 * @param {FastifyReply} res - The FastifyReply object.
 * @param {any} data - The data to be included in the response.
 * @param {string} message - The message to be included in the response.
 * @param {number} status - The status code of the response. Default is 200.
 */
export const APIResponse = (res: FastifyReply, data: any, message: string, status: number = 200) => {
  res.code(status).send({data: data, message: message});
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