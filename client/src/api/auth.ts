import { APIResponse } from "../types/API";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Check if the user is authenticated
export const checkAuth = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Content-Type': 'application/json'
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
        "Content-type": "application/json"
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