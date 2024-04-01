import { getCookieValue } from "../../../utils/cookieUtils";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ELEMENTS_PER_PAGE = import.meta.env.VITE_STEAMDERS_PER_PAGE;

export const searchSteamders = async (page: number) => {
    const limit = ELEMENTS_PER_PAGE;
    const offset = (page - 1) * ELEMENTS_PER_PAGE;
    try {
        const token = getCookieValue('token');
        const response = await fetch(`${BASE_URL}/waitlist/search?limit=${limit}&offset=${offset}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            method: 'GET',
            credentials: "include"
        });
        if (!response.ok)
            throw new Error('Erreur lors de la récupération des steamders');
        return response.json();
    } catch (err) {
        console.error("Erreur lors de la récupération des steamders :", err);
        throw new Error(err as string);
    }
};