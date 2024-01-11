import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Game
      "x_games_in_list_one": "<0>{{count}}</0> game in list",
      "x_games_in_list_other": "<0>{{count}}</0> games in list",
      "x_games_in_list_zero": "No game in list",
      "i_like": "Like !",
      "not_interesting": "Not interesting",
      "click_to_remove_like": "Click on a game to remove it from your Likes",
      "game_instructions": "Like or ignore the games displayed. The first game that will have been liked by all the players of the room will be displayed, and you will know how to waste the next hours of your precious life.",
      "game_countdown": "The room will select a random game 10 minutes after its creation if no choice has been made ...",
      "not_enough_players": "There must be at least two players in the room to start",
      "start": "Start",
      "leave": "Leave",
      "not_in_common_games": "<0>{{player1}}</0> and <0>{{player2}}</0>'s games don't match !",
      "x_games_in_common_one": "{{count}} game in common",
      "x_games_in_common_other": "{{count}} games in common",
      "x_games_in_common_zero": "No game in common :(",
      "waiting_for_admin": "Waiting for <0>{{username}}</0> to start the room ...",
      "copied_to_clipboard": "Room link copied to clipboard !",
      "you_have_been_kicked": "You have been kicked from the room",
      "player_has_been_kicked": "Player has been kicked from the room",
      "room_begins": "The game has begun",
      "admin_closed_room": "The administrator has closed the room",

      // Login page
      "disclaimer": "This site is not associated with Valve Corp.",
      "motto": "Let's play together !",
      "subtitle": "What are we Going to Play?",

      // Loading
      "hello_username": "Hello <0>{{username}}</0> !",
      "preparing_library": "We are preparing everything you need, please wait a moment, it shouldn't take long!",

      // Homepage
      "homepage_subtitle": "Organize yourself and choose games with your friends !",
      "create": "Create",
      "welcome_username": "Welcome <0>{{username}}</0> !",

      // Modal join
      "room_id": "Room ID",
      "join": "Join",

      // 404
      "not_found_page_title": "The page you are looking for does not exist ...",
      "not_found_page_subtitle": "But never mind, one day it may exist.",
      "back_homepage": "Back to homepage",

      // Footer
      "footer": "This site <0>is not associated</0> with Valve Corp.",

      // Navbar
      "donate": "Donate",
      "actual_room": "Actual room",
      "logout": "Logout",

      // Toast
      "kicked_player": "Player kicked",
    }
  },
  fr: {
    translation: {
      // Game
      "x_games_in_list_one": "<0>{{count}}</0> jeu dans la liste",
      "x_games_in_list_other": "<0>{{count}}</0> jeux dans la liste",
      "x_games_in_list_zero": "Aucun jeu dans la liste",
      "i_like": "J'aime !",
      "not_interesting": "Pas intéressant",
      "click_to_remove_like": "Cliquez sur un jeu pour le retirer de vos J'aimes",
      "game_instructions": "Aimez ou ignorez les jeux affichés. Le premier jeu qui aura été aimé par tout les joueurs de la room sera affiché, et vous saurez comment gaspiller les prochaines heures de votre précieuse vie.",
      "game_countdown": "La room sélectionnera un jeu aléatoire 10 minutes après sa création si aucun choix n'a pas été fait ...",
      "not_enough_players": "Il faut au moins deux joueurs dans la room pour commencer",
      "start": "Démarrer",
      "leave": "Quitter",
      "not_in_common_games": "Les jeux de <0>{{player1}}</0> et <0>{{player2}}</0> ne matchent pas !",
      "x_games_in_common_one": "{{count}} jeu en commun",
      "x_games_in_common_other": "{{count}} jeux en commun",
      "x_games_in_common_zero": "Aucun jeu en commun :(",
      "waiting_for_admin": "En attente de <0>{{username}}</0> pour démarrer la room ...",
      "copied_to_clipboard": "Lien de la room copié dans le presse-papier !",
      "you_have_been_kicked": "Vous avez été expulsé de la room",
      "player_has_been_kicked": "Un joueur a été expulsé de la room",
      "room_begins": "La partie a commencé",
      "admin_closed_room": "L'administrateur a fermé la room",

      // Login
      "disclaimer": "Ce site n'est pas associé à Valve Corp.",
      "motto": "Jouons ensemble !",
      "subtitle": "A quoi on va jouer ?",

      // Loading
      "hello_username": "Bonjour <0>{{username}}</0> !",
      "preparing_library": "Nous préparons tout ce qu'il faut pour vous, merci de patienter un instant, ça ne devrait pas être long !",

      // Homepage
      "homepage_subtitle": "Organisez-vous et choisissez des jeux avec vos amis !",
      "create": "Créer",
      "welcome_username": "Bienvenue <0>{{username}}</0> !",

      // Modal join
      "room_id": "ID de la room",
      "join": "Rejoindre",

      // 404
      "not_found_page_title": "La page que vous recherchez n'existe pas ...",
      "not_found_page_subtitle": "Mais pas grave, un jour ça existera peut-être.",
      "back_homepage": "Retour à l'accueil",

      // Footer
      "footer": "Ce site <0>n'est pas associé</0> à Valve Corp.",

      // Navbar
      "donate": "Faire un don",
      "actual_room": "Room actuelle",
      "logout": "Déconnexion",

      // Toast
      "kicked_player": "Joueur expulsé",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  }).then(() => {
    const detectedLng = i18n.language;
    const splitLng = detectedLng.split('-')[0];

    if (['fr', 'en'].includes(splitLng) && splitLng !== localStorage.getItem('i18nextLng')) {
      localStorage.setItem('i18nextLng', splitLng);
    }
  });

export default i18n;