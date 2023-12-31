import { useContext } from "react";

import { Auth, Room } from "../../../context";

import { Col, Row, Button } from "react-bootstrap";
import { leaveRoom as leave } from "../../../api/lobby";
import { useNavigate } from "react-router-dom";
import { WebSocket } from "../../../context";
import { toast } from "react-toastify";
import { APIResponse } from "../../../types/API";

export const RoomActionButtons: React.FC = () => {
    const { room, setRoom } = useContext(Room.Context)!;
    const { socket } = useContext(WebSocket.Context)!;
    const { setAuth, auth } = useContext(Auth.Context)!;
    const navigate = useNavigate();

    if (!room) return (<></>);
    const isAdmin = auth.user?.id === room.admin_id;

    const leaveRoom = () => {
        if (!socket) return;
        leave(room.id, setAuth)
            .then(() => {
                socket.send(JSON.stringify({
                    action: 'leave'
                }));
                setRoom(null);
                socket.close();
                navigate('/');
            })
            .catch((error: unknown) => {
                toast.error((error as APIResponse).message, {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    theme: "colored",
                    hideProgressBar: false,
                });
            });
    };

    const commonGames = room.commonGames.length > 0;
    const playersInRoom = room.players.length;

    const disabled = !commonGames || playersInRoom <= 1;

    const startRoom = () => {
        if (!socket || disabled) return;
        socket.send(JSON.stringify({
            action: 'start'
        }));
    }

    return (
    <Row className="justify-content-center">
        { isAdmin ?
        <Col xs="auto">
            <Button variant={disabled ? "outline-light" : "outline-primary"} size="lg" disabled={disabled} onClick={startRoom}>Démarrer</Button>
        </Col> : <></> }
        <Col xs="auto">
            <Button variant="outline-danger" size="lg" onClick={leaveRoom}>Quitter</Button>
        </Col>
    </Row>
    );
}

