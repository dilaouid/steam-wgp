import { FastifyReply, FastifyRequest } from "fastify";
import {on} from "events";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function TestRouter(request: FastifyRequest, reply: FastifyReply) {
  reply.sse(await (async function * source () {
    for (let i = 0; i < 10; i++) {
      sleep(2000);
      yield {id: i, data: "Some message"};
    }
  })())
}