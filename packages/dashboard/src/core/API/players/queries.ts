import { getCookieValue } from "@core/utils/cookies";

import { DASHBOARD_API } from '@core/environment';
import { TQueryParams } from "./types";

export const playerQueries = {
    // Get a player by its id
    get: (id: number) => {
        const token = getCookieValue('token');
        return fetch(`${DASHBOARD_API}/players/${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (!response.ok)
                throw new Error('Erreur lors de la récupération du joueur ' + id);
            return response.json();
        }).catch(err => {
            console.error("Erreur lors de la récupération du joueur " + id + ": " , err);
            throw new Error(err as string);
        });
    },

    // Get a list of players according to the query params (page, limit, ...)
    list: (params: TQueryParams) => {
        const token = getCookieValue('token');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const queryString = new URLSearchParams(params as any).toString();
    
        return fetch(`${DASHBOARD_API}/players?${queryString}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            if (!response.ok) throw new Error('failed_to_fetch_players');
            return response.json();
        }).catch(err => {
            console.error("Erreur lors de la récupération des joueurs: " + err);
            throw new Error(err as string);
        });
    },

    update: async ({ id, isAdmin, avatar_hash, username, profileurl }: { id: number, isAdmin: boolean, avatar_hash: string, username: string, profileurl: string }) => {
        const token = getCookieValue('token');
        const response = await fetch(`${DASHBOARD_API}/players/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: "include",
            body: JSON.stringify({ isAdmin, avatar_hash, username, profileurl })
        })

        if (!response.ok) {
            
            const errorDetails = await response.json();
            throw new Error(errorDetails.message);
        }
        return response.json();
    },

    syncLibrary: (id: string | number, force = false) => {
        const token = getCookieValue('token');
        return fetch(`${DASHBOARD_API}/players/${id}/sync-library${force ? '?force=true' : ''}`, {
            method: 'POST',
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la synchronisation de la bibliothèque');
            }
            return data;
        }).catch(err => {
            console.error("Erreur lors de la synchronisation de la bibliothèque: ", err);
            throw err;
        });
    }    
}