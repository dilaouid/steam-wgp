/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookieValue } from "../../../utils/cookieUtils";
import { drawToast } from "../../../utils/drawToast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

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