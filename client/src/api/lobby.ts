const BASE_URL = import.meta.env.VITE_BASE_URL;

export const joinOrLeaveRoom = async (roomId: string) => {
    try {
        const response = await fetch(BASE_URL + "/waitlist/" + roomId, {
            method: "PATCH",
            credentials: "include"
        });
        if (!response.ok)
            throw new Error("Impossible d'effectuer une action sur cette room");
        const res = await response.json();
        return res;
    } catch(err) {
        console.error("Une erreur est survenue lors de l'action sur la room: " + err);
        throw err;
    }
};

export const createRoom = async () => {
    try {
        const response = await fetch(BASE_URL + "/waitlist", {
            credentials: "include",
            method: "POST"
        });
        if (!response.ok)
            throw new Error("Impossible de créer la room");
        const res = await response.json();
        return res;
    } catch (err) {
        console.error("Une erreur est survenue lors de la création de la room: " + err)
    }
};