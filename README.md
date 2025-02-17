# SteamWGP 🎮

![GitHub top language](https://img.shields.io/github/languages/top/dilaouid/steam-wgp)
![GitHub repo size](https://img.shields.io/github/repo-size/dilaouid/steam-wgp)
![GitHub contributors](https://img.shields.io/github/contributors/dilaouid/steam-wgp)
![GitHub last commit](https://img.shields.io/github/last-commit/dilaouid/steam-wgp)
![License](https://img.shields.io/github/license/dilaouid/steam-wgp)
[![Netlify Status](https://api.netlify.com/api/v1/badges/43aa5e3c-4b06-4882-8de6-3b197b28f2b9/deploy-status)](https://app.netlify.com/sites/luxury-flan-667659/deploys)

**SteamWGP** is an innovative platform designed to enhance the gaming experience for Steam users by enabling them to organize and join game sessions easily. Our service leverages the power of social gaming to help players find compatible game partners and decide collectively which game to play during their gaming sessions.

## What is SteamWGP?

SteamWGP (*What are We Going to Play*) is a web-based platform that provides tools for Steam gamers to create or join "Steamders" - virtual rooms where players gather to select games they wish to play together. The platform simplifies the decision-making process through a user-friendly interface where games are swiped through until a unanimous decision is reached on the next game to play.

### Key features

- **Game discovery:** Users can discover new games based on what others in their Steamder are playing.
- **Group decisions:** Facilitates group decision-making where the first game liked by everyone is chosen.
- **Multi-Language support:** Offers a seamless experience in several languages, enhancing accessibility for a global audience.
  - ![English Flag](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png) English
  - ![French Flag](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/22px-Flag_of_France.svg.png) French
  - ![Spanish Flag](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/22px-Flag_of_Spain.svg.png) Spanish
  - ![German Flag](https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/22px-Flag_of_Germany.svg.png) German
  - ![Japanese Flag](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/22px-Flag_of_Japan.svg.png) Japanese
- **Privacy-First approach:** Ensures that game libraries are only shared with consent, maintaining user privacy as much as possible.

## Monorepo structure

SteamWGP is structured as a monorepo (pnpm workspace) consisting of two main packages:

- `client`: Contains all frontend code, hosted on Netlify. It provides the user interface through which users interact with the platform.
  - **Stack**: React, TypeScript, Zustand, Tanstack, Bootstrap, Storybook and i18next.
- `server`: Contains all backend code, hosted on Railway, using Fastify with TypeScript and Drizzle ORM over PostgreSQL to handle data management and API services.
  - **Stack**: Fastify, TypeScript, Drizzle ORM, PostgreSQL, and JWT.

Each package has its own README for more detailed information about the technical implementation and setup.

## Getting started

To start using SteamWGP, visit [SteamWGP Live Site](https://steamwgp.fr) or refer to the `client` and `server` directories for detailed setup instructions if you wish to run it locally or contribute to its development.

## Contributions

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. You can contribute through pull requests and by reporting bugs or suggesting enhancements.

The website is totally free to use and open-source. You can [donate to support the project and help us maintain it](https://ko-fi.com/dilaouid). But if you can't, that's okay too! You can contribute by sharing the project with your friends and family, and/or by giving us a star on GitHub ! Really, that means a lot !

## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.

## Contact

- [@LaouidD](https://twitter.com/LaouidD)  

---

We hope SteamWGP makes your gaming encounters more enjoyable and social. Happy gaming!
