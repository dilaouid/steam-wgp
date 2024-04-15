import useWebSocketStore from "../../../store/websocketStore";

export const switchDisplayGames = () => {
    const { sendMessage } = useWebSocketStore.getState();    
    const data = JSON.stringify({ action: 'allGamesSwitch' });
    
    sendMessage(data);
};