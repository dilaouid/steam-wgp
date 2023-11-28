/* eslint-disable no-multi-spaces */
import { FastifyInstance } from 'fastify';

import {
  createWaitlistOpts as createWaitlist,
  getWaitlistWithPlayersOpts as getWaitlist,
  joinOrLeaveWaitlistOpts as joinOrLeaveWaitlist } from '../controllers/waitlists';

export default async function waitlistRouter(fastify: FastifyInstance) {
  fastify.register(function (app: FastifyInstance, _, done) {
    app.route(createWaitlist),        // :POST  /waitlist
    app.route(getWaitlist);           // :GET   /waitlist/:id
    app.route(joinOrLeaveWaitlist);   // :PATCH /waitlist/:id
    done();
  });
}