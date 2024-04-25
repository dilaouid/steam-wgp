import { getCookieValue } from "../../../utils/cookieUtils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getSteamder = (steamderId: string) => {
    const token = getCookieValue('token');
    return fetch(`${BASE_URL}/waitlist/${steamderId}`, {
        method: 'GET',
        credentials: "include",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if (!response.ok)
            throw new Error('Erreur lors de la récupération du nombre de steamders');
        return response.json();
    }).catch(err => {
        console.error("Erreur lors de la récupération du nombre de steamders :", err);
        throw new Error(err as string);
    });
}