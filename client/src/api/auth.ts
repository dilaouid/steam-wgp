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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la vérification de l’authentification:', error);
    throw error;
  }
};