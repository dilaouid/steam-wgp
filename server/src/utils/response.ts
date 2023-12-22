import { FastifyReply } from "fastify";

export const APIResponse = (res: FastifyReply, data: any, message: string, status: number = 200) => {
  res.code(status).send({data: data, message: message});
};