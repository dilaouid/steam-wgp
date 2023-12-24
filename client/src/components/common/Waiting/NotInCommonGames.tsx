import { useContext } from "react";
import styled from "styled-components";

import { Room } from "../../../context";
import { SmallExclamationIcon } from "../Icons/SmallExclamationIcon";

const Paragraph = styled.p`
    margin-bottom: 0px;
`;

export const NotInCommonGames: React.FC = () => {
    const { room } = useContext(Room.Context)!;

    if (!room) return (<></>);

    const findMismatchedPlayers = (): string[] => {
        if (!room || room.players.length < 2) return [];
    
        const mismatchMessages: string[] = [];
    
        for (let i = 0; i < room.players.length; i++) {
            for (let j = i + 1; j < room.players.length; j++) {
                const player1 = room.players[i];
                const player2 = room.players[j];
    
                const commonGames = player1.games.filter(game => player2.games.includes(game));
                if (commonGames.length === 0) {
                    mismatchMessages.push(`Les jeux de ${player1.username} et ${player2.username} ne matchent pas !`);
                }
            }
        }
        return mismatchMessages;
    };

    const mismatchedPlayers = findMismatchedPlayers();

    return (
        <div>
            {mismatchedPlayers.map((message, index) => (
                <Paragraph className="text-danger" key={index}><SmallExclamationIcon /> {message}</Paragraph>
            ))}
        </div>);
}