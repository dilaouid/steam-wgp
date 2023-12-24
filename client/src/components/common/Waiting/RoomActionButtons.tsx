import { useContext } from "react";

import { RoomContext } from "../../../context/RoomProvider";
import { AuthContext } from "../../../context/AuthProvider";
import { Col, Row, Button } from "react-bootstrap";

export const RoomActionButtons: React.FC = () => {
    const { room } = useContext(RoomContext)!;
    const { auth } = useContext(AuthContext)!;

    if (!room) return (<></>);
    const isAdmin = auth.user?.id === room.admin_id;

    const calculateCommonGames = (): number => {
        if (room.players.length === 0)
            return 0;
        let commonGames = room.players[0].games;
    
        room.players.forEach(player => {
            commonGames = commonGames.filter(game => player.games.includes(game));
        });
    
        return commonGames.length;
    };

    const commonGames = calculateCommonGames();
    const playersInRoom = room.players.length;

    return (
    <Row className="justify-content-center">
        { isAdmin ?
        <Col xs="auto">
            <Button variant="outline-primary" size="lg" disabled={!commonGames || !playersInRoom}>Démarrer</Button>
        </Col> : <></> }
        <Col xs="auto">
            <Button variant="outline-danger" size="lg">Quitter</Button>
        </Col>
    </Row>
    );
}

