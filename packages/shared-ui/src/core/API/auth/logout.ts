export const logout = async (baseUrl: string) => {
    try {
        const response = await fetch(`${baseUrl}/auth/logout`, {
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