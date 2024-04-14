// src/store/useWebSocketStore.ts
import { create } from 'zustand';

interface WebSocketState {
  socket: WebSocket | null;
  message: { action: string, payload?: object };
  connect: (url: string, token: string) => void;
  sendMessage: (type: string, payload: object) => void;
  disconnect: () => void;
}

const useWebSocketStore = create<WebSocketState>((set, get) => ({
  socket: null,
  message: { action: '' },

  connect: (url: string, token: string) => {
    const ws = new WebSocket(url, [ token ]);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      set({ socket: ws });
    };

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      set({ message: newMessage });
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
