import { create } from 'zustand';
import * as websocketActions from '../services/websocket/actions';

interface WebSocketState {
  socket: WebSocket | null;
  message: { action: string, payload?: object };
  connect: (url: string, token: string) => void;
  sendMessage: (message: string) => void;
  disconnect: () => void;
}

const BASE_WS_URL = import.meta.env.VITE_BASE_WS_URL;

const useWebSocketStore = create<WebSocketState>((set, get) => ({
  socket: null,
  message: { action: '' },

  connect: (steamderId, token) => {
    const url = `${BASE_WS_URL}/ws/${steamderId}`;
    const ws = new WebSocket(url, [token]);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      set({ socket: ws });
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.action) {
        case "leave":
          websocketActions.leaveSteamder();
          break;
        case "start":
          websocketActions.startSteamder(data.waitlistId);
          break;
        case "kicked":
          websocketActions.kickSteamder(data.playerId);
          break;
        case "update":
          websocketActions.updateSteamder(data.player, data.commonGames);
          break;
        case "join":
          websocketActions.joinSteamder(data.player);
          break;
        case "gameEnd":
          websocketActions.endSteamder();
          break;
        default:
          console.error("Unknown action", data);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
      set({ socket: null });
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };
  },

  disconnect: () => {
    get().socket?.close();
  },

  sendMessage: (message: string) => {
    const { socket } = get();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  },
}));

export default useWebSocketStore;
