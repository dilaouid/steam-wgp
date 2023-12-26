import { useContext } from "react";
import styled from "styled-components";

import { Room } from "../../../context";

const Paragraph = styled.p`
    margin-bottom: 0px;
`;

export const InCommonGames: React.FC = () => {
    const { room } = useContext(Room.Context)!;
    if (!room) return (<></>);

    return (<Paragraph className={`${room.commonGames.length > 0 ? 'text-primary' : 'text-danger'}`}><b>{ room.commonGames.length } jeu{ room.commonGames.length > 1 ? 'x' : '' }</b> dans la liste</Paragraph>);
}