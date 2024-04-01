/* eslint-disable no-multi-spaces */
import { FastifyInstance } from 'fastify';

import {
  createWaitlistOpts as createWaitlist,
  getWaitlistWithPlayersOpts as getWaitlist,
  joinWaitlistOpts as joinWaitlist,
  kickFromWaitlistOpts as kickFromWaitlist,
  leaveWaitlistOpts as leaveWaitlist,
  getWaitlistsOpts as getWaitlists } from '../controllers/waitlists';

export default async function waitlistRouter(fastify: FastifyInstance) {
  fastify.register(function (app: FastifyInstance, _, done) {
    app.route(createWaitlist),        // :POST    /waitlist
    app.route(getWaitlists);          // :GET     /waitlist/search
    app.route(getWaitlist);           // :GET     /waitlist/:id
    app.route(joinWaitlist);          // :PATCH   /waitlist/:id
    app.route(leaveWaitlist)          // :DELETE  /waitlist/:id
    app.route(kickFromWaitlist);      // :DELETE  /waitlist/:id/kick/:playerId
    done();
  });
}