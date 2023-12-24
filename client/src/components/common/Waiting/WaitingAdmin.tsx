import { useContext } from "react";
import styled from "styled-components";

import { Room } from "../../../context";

import { Spinner } from "react-bootstrap";

const Paragraph = styled.p`
    margin-bottom: 0px;
`;

export const WaitingAdmin: React.FC = () => {
    const { room } = useContext(Room.Context)!;

    const roomAdmin = room?.players.find(p => p.player_id === room.admin_id);

    return (<Paragraph className="text-primary-emphasis">
        <Spinner size="sm" animation="border" variant="primary" role="status" />&nbsp; &nbsp;En attente de <b>{ roomAdmin?.username }</b> pour démarrer la room ...
    </Paragraph>);
}