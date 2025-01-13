import { getCookieValue } from "@core/utils/cookies";

import { BASE_URL } from '@core/environment';

export const leaveSteamder = (steamderId: string) => {
    const token = getCookieValue('token');
    return fetch(`${BASE_URL}/steamder/${steamderId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if (!response.ok)
            throw new Error("Impossible de quitter la Steamder");
        return response.json();
    }).catch(err => {
        console.error("Erreur lors de l'action de quitter la Steamder :", err);
        throw new Error(err as string);
    });
}