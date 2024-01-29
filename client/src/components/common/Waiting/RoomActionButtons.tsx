import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { Auth, Room } from "../../../context";

import { Col, Row, Button, Spinner } from "react-bootstrap";
import { leaveRoom as leave } from "../../../api/lobby";
import { useNavigate } from "react-router-dom";
import { WebSocket } from "../../../context";
import { toast } from "react-toastify";
import { APIResponse } from "../../../types/API";

export const RoomActionButtons: React.FC = () => {
    const [ loading, setLoading ] = useState(false);
    const { room, setRoom } = useContext(Room.Context)!;
    const { socket } = useContext(WebSocket.Context)!;
    const { setAuth, auth } = useContext(Auth.Context)!;
    const { t } = useTranslation();
    const navigate = useNavigate();

    if (!room) return (<></>);
    const isAdmin = auth.user?.id === room.admin_id;

    const leaveRoom = () => {
        if (!socket || loading) return;
        setLoading(true);
        leave(room.id, setAuth)
            .then(() => {
                socket.send(JSON.stringify({
                    action: 'leave'
                }));
                setRoom(null);
                setLoading(false);
                socket.close();
                navigate('/steam-wgp/');
            })
            .catch((error: unknown) => {
                toast.error((error as APIResponse).message, {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    theme: "colored",
                    hideProgressBar: false,
                });
                setLoading(false);
            });
    };

    const commonGames = room.commonGames.length > 0;
    const playersInRoom = room.players.length;

    const disabled = !commonGames || playersInRoom <= 1;

    const startRoom = () => {
        if (!socket || disabled || loading) return;
        setLoading(true);
        socket.send(JSON.stringify({
            action: 'start'
        }));
        setLoading(false);
    }

    return (
    <Row className="justify-content-center">
        { isAdmin ?
        <Col xs="auto">
            <Button variant={disabled || loading ? "outline-light" : "outline-primary"} size="lg" disabled={disabled || loading} onClick={startRoom}>{ loading ? <Spinner size="sm" /> : t('start') }</Button>
        </Col> : <></> }
        <Col xs="auto">
            <Button variant={loading ? "outline-light" : "outline-danger"} size="lg" disabled={loading} onClick={leaveRoom}>{ loading ? <Spinner size="sm" /> : t('leave') }</Button>
        </Col>
    </Row>
    );
}

