import useWebSocketStore from "@store/websocketStore";

export const swipeCard = (gameId: number) => {
    const { sendMessage } = useWebSocketStore.getState();
    const data = JSON.stringify({ action: 'swipe', payload: { gameId } });

    sendMessage(data);
};