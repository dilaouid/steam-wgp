import { BASE_URL } from '@core/environment';

export const logout = async () => {
    try {
        const response = await fetch(`${BASE_URL}/auth/logout`, {
            credentials: "include",
            method: "GET"
        });
        if (!response.ok)
            throw new Error("Impossible de déconnecter l'utilisateur authentifié")
        localStorage.removeItem('loadingLoginComplete');
    } catch (err) {
        console.error(err);
    }
};