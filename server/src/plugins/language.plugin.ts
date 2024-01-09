import { FastifyInstance } from "fastify";

const availableLanguages = ['en', 'fr'];

export const languageHookPlugin = (fastify: FastifyInstance) => {
  return fastify.addHook('onRequest', (request, reply, done) => {
    const requestedLanguage = request.headers['accept-language'] ?? 'en';
    const userLanguage = availableLanguages.includes(requestedLanguage) ? requestedLanguage : 'en';

    request.userLanguage = userLanguage;
    done()
  });
}