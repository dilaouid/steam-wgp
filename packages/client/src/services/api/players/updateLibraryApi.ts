import { getCookieValue } from "../../../utils/cookieUtils";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const updateLibrary = async (games: string[]) => {
    try {
        const token = getCookieValue('token');
        return fetch(`${BASE_URL}/library`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            credentials: "include",
            body: JSON.stringify({ games })
        }).then(res => res.json());
    } catch (err) {
        console.error("Erreur lors de la mise à jour de la bibliothèque :", err);
        throw new Error(err as string);
    }
};