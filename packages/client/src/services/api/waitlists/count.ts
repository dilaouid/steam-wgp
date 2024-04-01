
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const countSteamders = () => {
    return fetch(`${BASE_URL}/waitlist/count`, {
        method: 'GET',
        credentials: "include"
    }).then(response => {
        if (!response.ok)
            throw new Error('Erreur lors de la récupération du nombre de steamders');
        return response.json();
    }).catch(err => {
        console.error("Erreur lors de la récupération du nombre de steamders :", err);
        throw new Error(err as string);
    });
}