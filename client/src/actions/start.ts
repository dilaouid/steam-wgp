import { NavigateFunction } from "react-router-dom";
import { RoomInfo } from "../types/Room";
import { toast } from "react-toastify";
import i18n from "../locales/i18n";

export const start = (setRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>, id?: string, navigate?: NavigateFunction) => {
    toast.success(i18n.t('room_begins'), {
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