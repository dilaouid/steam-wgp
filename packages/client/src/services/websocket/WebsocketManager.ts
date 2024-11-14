import { useEffect } from 'react';
import useWebSocketStore from '@store/websocketStore';
import { getCookieValue } from '../../utils/cookieUtils';
import { useAuthStore } from '@store/authStore';

const WebSocketManager = () => {
  const { connect, disconnect } = useWebSocketStore();
  const { user } = useAuthStore.getState();
  const token = getCookieValue('token');

  useEffect(() => {
    if (user?.steamder && token) {
      connect(user.steamder, token);
    } else {
      disconnect();
    }

    /* return () => disconnect(); */
  }, [user, token, connect, disconnect]);

  return null;
};

export default WebSocketManager;
