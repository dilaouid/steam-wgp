import useWebSocketStore from "../../../store/websocketStore";

export const unswipeCard = (gameId: number) => {
    const { sendMessage } = useWebSocketStore.getState();
    const data = JSON.stringify({ action: 'unswipe', payload: { gameId } });

    sendMessage(data);
};