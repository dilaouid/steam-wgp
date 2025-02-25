import { getCookieValue } from "@core/utils/cookies";

import { DASHBOARD_API } from '@core/environment';

export const libraryQueries = {
    // Get a player library its id
    get: (id: number) => {
        const token = getCookieValue('token');
        return fetch(`${DASHBOARD_API}/library/${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (!response.ok)
                throw new Error('Erreur lors de la récupération de la bibliothèque ' + id);
            return response.json();
        }).catch(err => {
            console.error("Erreur lors de la récupération de la bibliothèque " + id + ": " , err);
            throw new Error(err as string);
        });
    },

    update: async ({ id, games }: { id: number, games: number[] }) => {
        const token = getCookieValue('token');
        const response = await fetch(`${DASHBOARD_API}/library/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: "include",
            body: JSON.stringify({games})
        })

        if (!response.ok) {
            const errorDetails = await response.json();
            console.log(errorDetails);
            throw new Error(errorDetails.message);
        }
        return response.json();
    },

    add: async ({ player_id, game_id, hidden }: { player_id: number, game_id: number, hidden: boolean }) => {
        const token = getCookieValue('token');
        const response = await fetch(`${DASHBOARD_API}/library/${player_id}`, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({ game_id, hidden })
        });
        if (!response.ok) {
            const errorDetails = await response.json();
            console.log(errorDetails);
            
            
            throw new Error(errorDetails.message);
        }
        return response.json();
    }
}