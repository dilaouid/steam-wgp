import { getCookieValue } from "../../../utils/cookieUtils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const joinSteamder = (steamderId: string) => {
    const token = getCookieValue('token');
    return fetch(`${BASE_URL}/waitlist/${steamderId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if (!response.ok)
            throw new Error("Impossible de rejoindre la Steamder");
        return response.json();
    }).catch(err => {
        console.error("Erreur lors de la récupération du nombre de steamders :", err);
        throw new Error(err as string);
    });
}