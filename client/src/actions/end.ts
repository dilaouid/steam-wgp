import { NavigateFunction } from "react-router-dom";
import i18n from "../locales/i18n";
import { RoomInfo } from "../types/Room";
import { State } from "../context/AuthProvider";
import { toast } from "react-toastify";

export const end = (
    socket: WebSocket,
    setRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>,
    inHomepage: boolean = false,
    navigate?: NavigateFunction,
    setAuth?: React.Dispatch<React.SetStateAction<State>>
    ) => {
        setRoom(null);
        socket.close();
        if (!inHomepage && navigate) {
            navigate('/steam-wgp/');
        } else if (setAuth && inHomepage) {
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
        }
        socket.close();
        toast.info(i18n.t('admin_closed_room'), {
            position: "bottom-right",
            autoClose: 2500,
            closeOnClick: true,
            theme: "colored",
            hideProgressBar: true,
        });
};