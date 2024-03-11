import { useContext } from 'react';
import { Context } from './WebsocketProvider';

export const useWebSocket = () => useContext(Context);
