import { create } from 'zustand';
import * as websocketActions from '@services/websocket/actions';

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
    const currentSocket = get().socket;
    if (currentSocket) {
      currentSocket.close();
    }

    const url = `${BASE_WS_URL}/ws/${steamderId}`;
    const ws = new WebSocket(url, [token]);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      set({ socket: ws });
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const actionHandler = actionMapping[data.action];
        if (actionHandler) {
          actionHandler(data);
        } else {
          console.error("Unknown WebSocket action:", data.action);
        }
      } catch (err) {
        console.error("WebSocket message parsing error:", err);
      }
    };

    ws.onclose = () => {
      console.error("Disconnected from WebSocket");
      set({ socket: null });
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
      set({ socket: null });
    }
  },

  sendMessage: (message: string) => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.warn("Cannot send message: WebSocket not connected");
    }
  }

}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const actionMapping: Record<string, (data: any) => void> = {
  leave: (data) => websocketActions.leaveSteamder(data.playerId),
  start: (data) => websocketActions.startSteamder(data.endTime, data?.steamderId),
  kicked: (data) => websocketActions.kickSteamder(data.playerId),
  update: (data) => websocketActions.updateSteamder(data.player, data.commonGames),
  join: (data) => websocketActions.joinSteamder(data.player),
  end: () => websocketActions.endSteamder(),
  gameEnd: (data) => websocketActions.gameEnd(data.choosed_game),
  allGamesSwitch: (data) =>
    websocketActions.switchDisplayGames(data.display_all_games),
  retrieve: (data) =>
    websocketActions.retrieveSteamder(data.swipedGames, data.endTime),
};

export default useWebSocketStore;