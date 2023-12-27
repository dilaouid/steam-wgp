import { APIResponse } from "../types/API";
import { Auth } from "../context";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getWaitlistInformations = async (roomId: string): Promise<APIResponse> => {
    try {
        const response = await  fetch(BASE_URL + "/waitlist/" + roomId, {
            credentials: "include"
        });
        const res: APIResponse = await response.json();
        if (!response.ok)
            throw new Error(res.message || "Impossible de récupérer les informations de la room");
        return res;
    } catch(err) {
        console.error("Une erreur est survenue lors de la récupération des informations de la room: " + err);
        throw err;
    }
}

export const joinOrLeaveRoom = async (roomId: string, setAuth: React.Dispatch<React.SetStateAction<Auth.State>>): Promise<APIResponse> => {
    try {
        const response = await fetch(BASE_URL + "/waitlist/" + roomId, {
            method: "PATCH",
            credentials: "include"
        });
        const res: APIResponse = await response.json();
        if (!response.ok)
            throw new Error(res.message || "Impossible de rejoindre la room");

        setAuth(prevAuth => ({
            ...prevAuth,
            user: {
                ...prevAuth.user,
                waitlist: res.data.action == "join" ? roomId : ''
            }
        }));
        return res;
    } catch(err) {
        console.error("Une erreur est survenue lors de l'action sur la room: " + err);
        throw err;
    }
};

export const kickPlayer = async (roomId: string, playerId: string): Promise<APIResponse> => {
    try {
        const response = await fetch(BASE_URL + "/waitlist/" + roomId + "/kick/" + playerId, {
            method: "DELETE",
            credentials: "include"
        });
        const res: APIResponse = await response.json();
        if (!response.ok)
            throw new Error(res.message || "Impossible de kick le joueur");
        return res;
    } catch(err) {
        console.error("Une erreur est survenue lors du kick du joueur: " + err);
        throw err;
    }
};

export const createRoom = async (setAuth: React.Dispatch<React.SetStateAction<Auth.State>>): Promise<APIResponse> => {
    try {
        const response = await fetch(BASE_URL + "/waitlist", {
            credentials: "include",
            method: "POST"
        });
        const res = await response.json();
        if (!response.ok)
            throw new Error(res.message || "Impossible de créer la room");
        setAuth(prevAuth => ({
            ...prevAuth,
            user: {
                ...prevAuth.user,
                waitlist: res.data.id
            }
        }));
        return res;
    } catch(err) {
        console.error("Une erreur est survenue lors de la création de la room: ", err);
        throw err;
    }
};