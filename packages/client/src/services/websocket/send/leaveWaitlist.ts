import useWebSocketStore from "../../../store/websocketStore";

export const leaveWaitlist = () => {
    const { sendMessage } = useWebSocketStore.getState();
    const data = JSON.stringify({ action: 'leave' });

    sendMessage(data)
};