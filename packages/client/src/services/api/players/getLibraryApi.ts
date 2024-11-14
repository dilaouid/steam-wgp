import { getCookieValue } from "@utils/cookieUtils";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getLibrary = async () => {
    try {
        const token = getCookieValue('token');
        const response = await fetch(`${BASE_URL}/library`, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            method: 'GET',
            credentials: "include"
        });
        if (!response.ok)
            throw new Error('Erreur lors de la récupération de la bibliothèque');
        return response.json();
    } catch (err) {
        console.error("Erreur lors de la récupération de la bibliothèque :", err);
        throw new Error(err as string);
    }
};