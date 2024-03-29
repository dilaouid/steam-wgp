import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import { KickIcon } from "../Icons/KickIcon";

import './KickButton.css';
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Room, WebSocket } from "../../../context";
import { kickPlayer } from "../../../api/lobby";

export default function KickButton({ playerId }: { playerId: string }) {
    const [ loading, setLoading ] = useState<boolean>(false);
    const { room } = useContext(Room.Context)!;
    const { socket } = useContext(WebSocket.Context)!;
    const { t } = useTranslation();

    if (!room || !socket) return (<></>);

    const kick = async () => {
        if (loading) return;
        setLoading(true);
        kickPlayer(room.id, playerId).then(() => {
            socket.send(JSON.stringify({
                action: 'kick',
                payload: { playerId: playerId }
            }));
            toast.success(t('kicked_player'), {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                theme: "colored",
                hideProgressBar: true,
            });
        }).catch((error) => {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                theme: "colored",
                hideProgressBar: true,
            });
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
    <button className={`btn ${loading ? "btn-light" : "btn-danger"} btn-sm kick_player_btn`} type="button" onClick={kick} disabled={loading}>
        { loading ? <Spinner animation="border" size="sm" /> : <KickIcon /> }
    </button>);
}