/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookieValue } from "@core/utils/cookies";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const updateLibrary = async (games: string[]) => {
    try {
        const token = getCookieValue('token');
        const response = await fetch(`${BASE_URL}/library`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            credentials: "include",
            body: JSON.stringify({ games })
        });
        if (!response.ok) {
            const res = await response.json();
            throw new Error(res.message);
        }
        return response.json();
    } catch (err: any) {
        console.error("Erreur lors de la mise à jour de la bibliothèque :", err.message);
        throw new Error(err.message);
    }
};