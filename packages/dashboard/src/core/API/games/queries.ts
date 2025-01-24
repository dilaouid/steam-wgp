import { getCookieValue } from "@core/utils/cookies";

import { DASHBOARD_API } from '@core/environment';
import { TQueryParams } from "./types";

export const gameQueries = {
    // Get a game by its id
    get: (id: number) => {
        const token = getCookieValue('token');
        return fetch(`${DASHBOARD_API}/games/${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (!response.ok)
                throw new Error('Erreur lors de la récupération du jeu ' + id);
            return response.json();
        }).catch(err => {
            console.error("Erreur lors de la récupération du jeu " + id + ": " , err);
            throw new Error(err as string);
        });
    },

    // Get a list of games according to the query params (offset, limit, onlyIsSelectable, onlyNotSelectable, search, sort, order)
    list: (params: TQueryParams) => {
        const token = getCookieValue('token');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const queryString = new URLSearchParams(params as any).toString();
    
        return fetch(`${DASHBOARD_API}/games?${queryString}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            if (!response.ok) throw new Error('failed_to_fetch_games');
            return response.json();
        }).catch(err => {
            console.error("Erreur lors de la récupération des jeux: " + err);
            throw new Error(err as string);
        });
    },

    // Create a new game
    create: async ({ id, is_selectable }: { id: number, is_selectable: boolean }) => {
        const token = getCookieValue('token');
        const response = await fetch(`${DASHBOARD_API}/games`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({ id, is_selectable })
        })
    
        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message);
        }
        return response.json();
    },

    // Update a game (basically, update the is_selectable field)
    update: async ({ id, is_selectable }: { id: number, is_selectable: boolean }) => {
        const token = getCookieValue('token');
        const response = await fetch(`${DASHBOARD_API}/games/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: "include",
            body: JSON.stringify({ is_selectable })
        })
    
        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message);
        }
        return response.json();
    }
}