import { FastifyInstance } from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';

export default async function ssrRouter(fastify: FastifyInstance) {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../../dist/client'),
    prefix: '/static',
  });

  // Route générique pour le SSR
  fastify.get('/*', async (req, reply) => {
    try {
      const { render } = await import('../../../../../client/src/entry-server.tsx');
      const { appHtml, dehydratedState } = await render(req.url);
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/png" href="/favicon.png" />
            
            <meta name="twitter:site" content="@LaouidD">
            <meta name="twitter:title" content="SteamWGP">
            <meta name="twitter:description" content="Rejoignez SteamWGP pour trouver les meilleurs jeux multijoueurs à jouer avec vos amis. Créez ou participez à une Steamder pour décider des jeux à jouer ensemble !">
            <meta name="twitter:image" content="https://raw.githubusercontent.com/dilaouid/steam-wgp/media/twitter_cover.jpg">

            <meta name="description" content="Rejoignez SteamWGP pour trouver les meilleurs jeux multijoueurs à jouer avec vos amis. Créez ou participez à une Steamder pour décider des jeux à jouer ensemble !">
            <meta property="og:title" content="SteamWGP">
            <meta property="og:type" content="website">
            <meta property="og:site_name" content="SteamWGP">
            <meta property="og:url" content="https://steamwgp.fr">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/cyborg/bootstrap.min.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">
            <link rel="stylesheet" href="/styles.css">

            <title>SteamWGP</title>
        </head>
        <body>
            <div id="root">${appHtml}</div>
            <script>
            window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};
            </script>
            <script type="module" src="/static/main.js"></script>
        </body>
        </html>
    `;
      reply.type('text/html').send(html);
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send('Internal Server Error');
    }
  });
}
