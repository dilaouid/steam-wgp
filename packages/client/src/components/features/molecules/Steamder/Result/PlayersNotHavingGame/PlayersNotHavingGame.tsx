import { PlayerNotHavingGame } from "@features/atoms/Steamder/PlayerNotHavingGame/PlayerNotHavingGame";

import { Row } from "./PlayersNotHavingGame.styled";
import type { playersWithoutGameProps } from "./PlayersNotHavingGame.props";

export const PlayersNotHavingGame: React.FC<playersWithoutGameProps> = ({ playersWithoutGame }) => {
    return (
        <Row className="justify-content-center">
            { playersWithoutGame.map(player => (
                <PlayerNotHavingGame key={player.player_id} player={player} />
            )) }
        </Row>
    );
};