import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Les ressources de traduction
const resources = {
  en: {
    translation: {
      // Game
      "i_like": "Like !",
      "not_interesting": "Not interesting",
      "click_to_remove_like": "Click on a game to remove it from your Likes",
      "game_instructions": "Like or ignore the games displayed. The first game that will have been liked by all the players of the room will be displayed, and you will know how to waste the next hours of your precious life.",
      "game_countdown": "The room will select a random game 10 minutes after its creation if no choice has been made ...",

      // 404
      "not_found_page_title": "The page you are looking for does not exist ...",
      "not_found_page_subtitle": "But never mind, one day it may exist.",
      "back_homepage": "Back to homepage",

      // Footer
      "footer": "This site <1>is not associated</1> with Valve Corp.",

      // Navbar
      "donate": "Donate",
      "actual_room": "Actual room",
      "logout": "Logout",
    }
  },
  fr: {
    translation: {
      // Game
      "i_like": "J'aime !",
      "not_interesting": "Pas intéressant",
      "click_to_remove_like": "Cliquez sur un jeu pour le retirer de vos J'aimes",
      "game_instructions": "Aimez ou ignorez les jeux affichés. Le premier jeu qui aura été aimé par tout les joueurs de la room sera affiché, et vous saurez comment gaspiller les prochaines heures de votre précieuse vie.",
      "game_countdown": "La room sélectionnera un jeu aléatoire 10 minutes après sa création si aucun choix n'a pas été fait ...",

      // 404
      "not_found_page_title": "La page que vous recherchez n'existe pas ...",
      "not_found_page_subtitle": "Mais pas grave, un jour ça existera peut-être.",
      "back_homepage": "Retour à l'accueil",

      // Footer
      "footer": "Ce site <1>n'est pas associé</1> à Valve Corp.",

      // Navbar
      "donate": "Faire un don",
      "actual_room": "Room actuelle",
      "logout": "Déconnexion",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // langue par défaut
    interpolation: {
      escapeValue: false, // réagit déjà à l'échappement
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  }).then(() => {
    // Logique personnalisée après l'initialisation de i18n
    const detectedLng = i18n.language;
    const splitLng = detectedLng.split('-')[0];

    if (['fr', 'en'].includes(splitLng) && splitLng !== localStorage.getItem('i18nextLng')) {
      localStorage.setItem('i18nextLng', splitLng);
    }
  });

export default i18n;