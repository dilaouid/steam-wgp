import { useContext } from "react";
import styled from "styled-components";
import { Trans } from "react-i18next";

import { Room } from "../../../context";
import { SmallExclamationIcon } from "../Icons/SmallExclamationIcon";

const Paragraph = styled.p`
    margin-bottom: 0px;
`;

interface IMismatchedPlayers {
    player1: string;
    player2: string;
}

export const NotInCommonGames: React.FC = () => {
    const { room } = useContext(Room.Context)!;

    if (!room) return (<></>);

    const findMismatchedPlayers = (): IMismatchedPlayers[] => {
        if (!room || room.players.length < 2) return [];
    
        const mismatchMessages: IMismatchedPlayers[] = [];
    
        for (let i = 0; i < room.players.length; i++) {
            for (let j = i + 1; j < room.players.length; j++) {
                const player1 = room.players[i];
                const player2 = room.players[j];
    
                const commonGames = player1.games.filter(game => player2.games.includes(game));
                if (commonGames.length === 0) {
                    mismatchMessages.push({player1: player1.username, player2: player2.username});
                }
            }
        }
        return mismatchMessages;
    };

    const mismatchedPlayers = findMismatchedPlayers();

    return (
        <div>
            {mismatchedPlayers.map((players, index) => (
                <Paragraph className="text-danger" key={index}><SmallExclamationIcon />
                    &nbsp;<Trans i18nKey="not_in_common_games" components={[<strong key="0" />]} values={{ player1: players.player1, player2: players.player2 }} />
                </Paragraph>
            ))}
        </div>);
}