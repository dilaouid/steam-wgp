import { APIResponse } from "../types/API";
import { Auth } from "../context";
import { getCookieValue } from "../utils/getCookie";
import { getBrowserLanguage } from "../utils/getLanguage";
const language = getBrowserLanguage();

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = getCookieValue('token');

export const getWaitlistInformations = async (roomId: string, setAuth: React.Dispatch<React.SetStateAction<Auth.State>>): Promise<APIResponse> => {
    try {
        const response = await  fetch(BASE_URL + "/waitlist/" + roomId, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept-Language': language
            },
            credentials: "include"
        });
        const res: APIResponse = await response.json();
        if (!response.ok)
            throw new Error(res.message || "Impossible de récupérer les informations de la room");
        return res;
    } catch(err) {
        console.error("Une erreur est survenue lors de la récupération des informations de la room: " + err);
        return joinRoom(roomId, setAuth).then( (data) => {
            setAuth(prevAuth => ({
                ...prevAuth,
                user: {
                    ...prevAuth.user,
                    waitlist: roomId
                }
            }));
            return data;
        }).catch(err => {
            throw err;
        });
    }
}

export const joinRoom = async (roomId: string, setAuth: React.Dispatch<React.SetStateAction<Auth.State>>): Promise<APIResponse> => {
    try {
        const response = await fetch(BASE_URL + "/waitlist/" + roomId, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept-Language': language
            },
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
                waitlist: roomId
            }
        }));
        return res;
    } catch(err) {
        console.error("Une erreur est survenue lors de l'action sur la room: " + err);
        throw err;
    }
};

export const leaveRoom = async (roomId: string, setAuth: React.Dispatch<React.SetStateAction<Auth.State>>): Promise<APIResponse> => {
    try {
        const response = await fetch(BASE_URL + "/waitlist/" + roomId, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept-Language': language
            },
            method: "DELETE",
            credentials: "include"
        });
        const res: APIResponse = await response.json();
        if (!response.ok)
            throw new Error(res.message || "Impossible de quitter la room");

        setAuth(prevAuth => ({
            ...prevAuth,
            user: {
                ...prevAuth.user,
                waitlist: null
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
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept-Language': language
            },
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
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept-Language': language
            },
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