import useWebSocketStore from "@store/websocketStore";

export const updateLibraryWS = (publicGames: string[]) => {
    const { sendMessage } = useWebSocketStore.getState();    
    const data = JSON.stringify({ action: 'update', payload: { publicGames } });
    
    sendMessage(data);
};