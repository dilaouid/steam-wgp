import { getCookieValue } from "@utils/cookieUtils";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createSteamder = async ({name, isPrivate}: { name: string, isPrivate: boolean }) => {
    try {
        const token = getCookieValue('token');
        return fetch(`${BASE_URL}/steamder`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({ name, isPrivate })
        }).then(res => res.json());
    } catch (err) {
        console.error("Erreur lors de la création de la Steamder :", err);
        throw new Error(err as string);
    }
};