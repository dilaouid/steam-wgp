/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookieValue } from "@core/utils/cookies";
import { drawToast } from "@core/utils/drawToast";
import { BASE_URL } from '@core/environment';

export const deleteUser = async () => {
    try {
        const token = getCookieValue('token');
        const response = await fetch(`${BASE_URL}/players`, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            method: 'DELETE',
            credentials: "include"
        });
        const res = await response.json();
        if (!response.ok) 
            throw res.message
        return res;
    } catch (error: string | any) {
        drawToast(error, 'error');
        throw new Error(error as string);
    }
};