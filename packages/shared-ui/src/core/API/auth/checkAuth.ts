import { deleteCookie, getCookieValue, setCookieValue } from "@core/utils";
import { IAuthConfig } from "@core/types";

export const checkAuth = async (config: IAuthConfig) => {
  let token: string | null = getCookieValue('token') as string;
  const { baseUrl, sameSite } = config;

  // used in the case if the client and the server are not on the same domain, so the token is passed as a query parameter
  if (!sameSite && !token) {
    const urlParams = new URLSearchParams(window.location.search);
    token = urlParams.get('token');
    if (token) {
        setCookieValue('token', token, { path: '/' });
        window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  if (!token)
    throw new Error('Aucun token d\'authentification trouvé');

  try {
    const response = await fetch(`${baseUrl}/auth/me`, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      credentials: "include"
    });

    if (!response.ok) throw new Error('Authentification non vérifiée');

    return response.json();
  } catch (err) {
    deleteCookie('token');
  
    localStorage.removeItem('loadingLoginComplete')
    localStorage.removeItem('postLoginRedirect');

    console.error("Erreur lors de la vérification de l'authentification :", err);
    throw new Error(err as string);
  }
};