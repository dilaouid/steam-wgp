import { APIResponse } from "../types/API";
import { getCookieValue } from "../utils/getCookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = getCookieValue('token');

// Check if the user is authenticated
export const checkAuth = async () => {
  try {

    // check if the user has no token cookie formatted like a jwt token
    if (!document.cookie.split(';').some((item) => item.trim().startsWith('token='))) {
      // check if the user has a token in the query string
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        // set the token cookie
        document.cookie = `token=${token}; path=/;`;
      }
    }
    window.history.replaceState({}, document.title, window.location.pathname);

    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error('Authentification non vérifiée');
    }

    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error('Erreur lors de la vérification de l’authentification:', error);
    throw error;
  }
};

// Log out the authenticated user
export const logOut = async (): Promise<APIResponse> => {
  try {
    const response = await fetch(BASE_URL + "/auth/logout", {
      credentials: "include",
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    if (!response.ok)
      throw new Error("Impossible de déconnecter l'utilisateur authentifié")
    
    const res = await response.json();
    return res;
  } catch (err) {
    console.error("Une erreur est survenue lors de la déconnexion de l'utilisateur: " + err)
    throw err;
  }
};