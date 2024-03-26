import { getCookieValue, setCookieValue } from "../../../../utils/cookieUtils";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const SAME_SITE = import.meta.env.VITE_SAME_SITE;

export const checkAuth = async () => {
  let token: string | null = getCookieValue('token') as string;

  if (!SAME_SITE && !token) {
    const urlParams = new URLSearchParams(window.location.search);
    token = urlParams.get('token');
    if (token) {
        setCookieValue('token', token, { path: '/' });
        window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  if (!token) throw new Error('Aucun token d\'authentification trouvé');

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
};