const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchStats = async () => {
    const response = await fetch(`${BASE_URL}/stats`);
    if (!response.ok)
        throw new Error('An error occured while fetching stats.');
    return response.json();
};