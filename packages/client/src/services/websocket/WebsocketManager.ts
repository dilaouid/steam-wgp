import { useEffect } from 'react';
import useWebSocketStore from '../../store/websocketStore';
import { useSteamderStore } from '../../store/steamderStore';
import { getCookieValue } from '../../utils/cookieUtils';

const WebSocketManager = () => {
  const { connect, disconnect } = useWebSocketStore();
  const { steamder } = useSteamderStore();
  const token = getCookieValue('token');

  useEffect(() => {
    if (steamder?.id && token) {
      connect(steamder.id, token);
    } else {
      disconnect();
    }

    return () => disconnect();
  }, [steamder?.id, token, connect, disconnect]);

  return null;
};

export default WebSocketManager;
