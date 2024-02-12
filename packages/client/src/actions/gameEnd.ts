import React from "react";
import { RoomInfo } from "../types/Room";
import { State } from "../context/AuthProvider";

export const gameEnd = (setRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>, setAuth: React.Dispatch<React.SetStateAction<State>>, winner: number) => {
    setRoom((prev) => {
        if (!prev) return prev;
        return { 
            ...prev, 
            ended: true,
            winner: winner
        };
    });
    setAuth((prev) => {
        if (!prev) return prev;
        return { 
            ...prev, 
            user: {
                ...prev.user,
                waitlist: null
            }
        };
    });
};