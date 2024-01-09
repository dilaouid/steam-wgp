import i18next from "i18next";

i18next.init({
  resources: {
    en: {
      translation: {
        "internal_server_error": "An internal server error occurred",
        "logged_in_to_access_library": "You must be logged in to access your library",
        "forbidden_access": "Access forbidden",
        "logged_in": "You are logged in",
        "logged_out": "You are logged out",
        "logged_in_to_view_profile": "You must be logged in to view your profile",
        "need_to_be_logged_in": "You need to be logged in to perform this action",
        "load_steam_library": "Loading your Steam library...",
        "steam_library_not_accessible": "Your Steam library is not accessible at the moment. Your account may be private, or you don't have any game.",
        "steam_library_not_accessible_yet": "Your Steam library is not accessible at the moment.",
        "adding_games_to_library": "Adding games to library...",
        "adding_games_to_collection": "Adding games to collection...",
        "game_cannot_add_singular": "{{count}} game could not be added to your library",
        "game_cannot_add_plural": "{{count}} games could not be added to your library",
        "error_occured_in_loading_library": "An error occured while loading your library, please try again later",
        "loading_library_complete": "Loading library complete, you will now be redirected",
        "session_expired": "Your session has expired, please log in again",
        "retrieved_library": "Retrieved library",
        "room_does_not_exist": "The room does not exist",
        "no_id_provided": "No id was provided",
        "retrieved_room": "Retrieved room",
        "room_already_started": "The room has already started",
        "already_in_a_room": "You are already in a room",
        "not_in_the_room": "You are not in the room",
        "joined_the_room": "You joined the room",
        "left_the_room": "You left the room",
        "not_room_admin": "You are not the room admin",
        "kicked_player": "The player has been kicked",
      }
    },
    fr: {
      translation: {
        "internal_server_error": "Une erreur interne est survenue",
        "logged_in_to_access_library": "Vous devez être connecté pour accéder à votre bibliothèque",
        "forbidden_access": "Accès interdit",
        "logged_in": "Vous êtes connecté",
        "logged_out": "Vous êtes déconnecté",
        "logged_in_to_view_profile": "Vous devez être connecté pour accéder à votre profil",
        "need_to_be_logged_in": "Vous devez être connecté pour effectuer cette action",
        "load_steam_library": "Chargement de votre bibliothèque Steam...",
        "steam_library_not_accessible": "Votre bibliothèque Steam n'est pas accessible pour le moment. Votre compte est peut-être privé, ou alors vous n'avez pas de jeu.",
        "steam_library_not_accessible_yet": "Votre bibliothèque Steam n'est pas accessible pour le moment.",
        "adding_games_to_library": "Ajout des jeux à la bibliothèque ...",
        "adding_games_to_collection": "Ajout des jeux à la collection ...",
        "game_cannot_add_singular": "{{count}} jeu n'a pas pu être ajouté à votre bibliothèque",
        "game_cannot_add_plural": "{{count}} jeux n'ont pas pu être ajoutés à votre bibliothèque",
        "error_occured_in_loading_library": "Une erreur est survenue lors du chargement de votre bibliothèque, veuillez réessayer plus tard",
        "loading_library_complete": "Chargement de la bibliothèque terminé, vous allez maintenant être redirigé",
        "retrieved_library": "Bibliothèque récupérée",
        "session_expired": "Votre session a expiré, veuillez vous reconnecter",
        "room_does_not_exist": "La room n'existe pas",
        "no_id_provided": "Aucun id n'a été fourni",
        "retrieved_room": "Room récupérée",
        "room_already_started": "La room a déjà commencé",
        "already_in_a_room": "Vous êtes déjà dans une room",
        "not_in_the_room": "Vous n'êtes pas dans la room",
        "joined_the_room": "Vous avez rejoint la room",
        "left_the_room": "Vous avez quitté la room",
        "not_room_admin": "Vous n'êtes pas admin de la room",
        "kicked_player": "Le joueur a été kické",
      }
    }
  },
  lng: "fr",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18next;