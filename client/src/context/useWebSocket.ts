import { useContext } from 'react';
import { WebSocketContext } from './WebsocketProvider';

export const useWebSocket = () => useContext(WebSocketContext);
