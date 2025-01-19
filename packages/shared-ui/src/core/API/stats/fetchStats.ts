export const fetchStats = async (baseUrl: string) => {
    const response = await fetch(`${baseUrl}/stats`);
    if (!response.ok)
        throw new Error('An error occured while fetching stats.');
    return response.json();
};