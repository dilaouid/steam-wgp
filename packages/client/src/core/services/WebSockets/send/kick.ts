import useWebSocketStore from "@store/websocketStore";

export const kickFromSteamderWS = (playerId: string) => {
    const { sendMessage } = useWebSocketStore.getState();
    const data = JSON.stringify({ action: 'kick', payload: { playerId } });

    sendMessage(data)
};