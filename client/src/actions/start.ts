import { NavigateFunction } from "react-router-dom";
import { RoomInfo } from "../types/Room";
import { toast } from "react-toastify";

export const start = (setRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>, id?: string, navigate?: NavigateFunction) => {
    toast.success("La partie a commencé", {
        position: "bottom-right",
        autoClose: 2500,
        closeOnClick: true,
        theme: "colored",
        hideProgressBar: true,
    });
    setRoom((prev) => {
        if (!prev) return prev;
        return { 
            ...prev, 
            started: true
        };
    });
    if (id && navigate)
        navigate(`/waitlist/${id}`);
};