import useWebSocketStore from "@store/websocketStore";

export const startSteamder = () => {
    const { sendMessage } = useWebSocketStore.getState();
    const data = JSON.stringify({ action: 'start' });

    sendMessage(data)
};