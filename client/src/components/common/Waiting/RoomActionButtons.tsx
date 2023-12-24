import { useContext } from "react";

import { Auth, Room } from "../../../context";

import { Col, Row, Button } from "react-bootstrap";

export const RoomActionButtons: React.FC = () => {
    const { room } = useContext(Room.Context)!;
    const { auth } = useContext(Auth.Context)!;

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

    const disabled = !commonGames || playersInRoom <= 1;

    return (
    <Row className="justify-content-center">
        { isAdmin ?
        <Col xs="auto">
            <Button variant={disabled ? "outline-light" : "outline-primary"} size="lg" disabled={disabled}>Démarrer</Button>
        </Col> : <></> }
        <Col xs="auto">
            <Button variant="outline-danger" size="lg">Quitter</Button>
        </Col>
    </Row>
    );
}

