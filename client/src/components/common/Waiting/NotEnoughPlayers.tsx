import { useContext } from "react";
import styled from "styled-components";

import { RoomContext } from "../../../context/RoomProvider";

const Paragraph = styled.p`
    margin-bottom: 0px;
`;

export const NotEnoughPlayers: React.FC = () => {
    const { room } = useContext(RoomContext)!;
    if (!room || room.players.length > 1) return (<></>);

    return (<Paragraph className="text-dark text-opacity-25">Il faut au moins deux joueurs dans la room pour commencer</Paragraph>);
}