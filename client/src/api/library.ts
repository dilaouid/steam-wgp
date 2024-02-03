import { APIResponse } from "../types/API";
import { getCookieValue } from "../utils/getCookie";
import { getBrowserLanguage } from "../utils/getLanguage";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/library";
const token = getCookieValue('token');
const language = getBrowserLanguage();

// Get the library of the user
export const getLibrary = async (): Promise<APIResponse> => {
  try {
    const response = await fetch(BASE_URL, {
      credentials: "include",
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept-Language': language
      }
    });
    if (!response.ok)
      throw new Error("Impossible de récupérer la bibliothèque de l'utilisateur")
    
    const res = await response.json();
    return res;
  } catch (err) {
    console.error("Une erreur est survenue lors de récupération de la bibliothèque de l'utilisateur");
    console.error(err);
    throw err;
  }
};

// Update the hidden games of the user
export const updateHiddenGames = async (games: string[]): Promise<APIResponse> => {
  try {
    const response = await fetch(BASE_URL, {
      credentials: "include",
      method: "PATCH",
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept-Language': language,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ games })
    });
    if (!response.ok)
      throw new Error("Impossible de mettre à jour les jeux cachés de l'utilisateur")
    const res = await response.json();
    return res;
  } catch (err) {
    console.error("Une erreur est survenue lors de la mise à jour des jeux cachés de l'utilisateur");
    console.error(err);
    throw err;
  }
};