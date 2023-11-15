import { FastifyInstance } from 'fastify';
import { createWaitlist } from '../controllers/waitlists';
import { isAuthenticated } from '../auth/mw';

import {
  getWaitlistWithPlayers as getWaitlist,
  getWaitlistWithPlayersOpts as getOpts,
  getWaitlistWithPlayersParams as getParams } from '../controllers/waitlists';

import {
  joinOrLeaveWaitlist as joinOrLeave,
  joinOrLeaveWaitlistParams as joinParams } from '../controllers/waitlists';

export default async function waitlistRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.post('/', { preValidation: [isAuthenticated] }, createWaitlist);
    fastify.get<{ Params: getParams }>('/:id', getOpts, getWaitlist);
    fastify.patch<{ Params: joinParams }>('/:id', { preValidation: [isAuthenticated] }, joinOrLeave);
  }, { prefix: '/waitlist' });
}