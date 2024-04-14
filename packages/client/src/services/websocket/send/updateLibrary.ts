export const updateLibrary = (library: string[]) => {
    return JSON.stringify({ action: 'update', payload: { library } });
};