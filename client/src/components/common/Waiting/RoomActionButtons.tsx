import { useContext } from "react";

import { Auth, Room } from "../../../context";

import { Col, Row, Button } from "react-bootstrap";
import { joinOrLeaveRoom } from "../../../api/lobby";
import { useNavigate } from "react-router-dom";
import { WebSocket } from "../../../context";

export const RoomActionButtons: React.FC = () => {
    const { room } = useContext(Room.Context)!;
    const { socket } = useContext(WebSocket.Context)!;
    const { setAuth, auth } = useContext(Auth.Context)!;
    const navigate = useNavigate();

    if (!room) return (<></>);
    const isAdmin = auth.user?.id === room.admin_id;

    const leaveRoom = () => {
        if (!socket) return;
        joinOrLeaveRoom(room.id, setAuth)
            .then(() => {
                socket.send(JSON.stringify({
                    action: 'leave'
                }));
                navigate('/');
            })
            .catch((error) => {
                console.error('Erreur lors de la sortie de la room:', error);
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

