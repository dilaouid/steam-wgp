import { useContext } from "react";
import styled from "styled-components";

import { RoomContext } from "../../../context/RoomProvider";

const Paragraph = styled.p`
    margin-bottom: 0px;
`;

export const InCommonGames: React.FC = () => {
    const { room } = useContext(RoomContext)!;
    if (!room) return (<></>);

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

    return (<Paragraph className={`${commonGames > 0 ? 'text-primary' : 'text-danger'}`}><b>{ commonGames } jeu{ commonGames > 1 ? 'x' : '' }</b> dans la liste</Paragraph>);
}