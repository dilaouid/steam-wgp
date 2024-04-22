import styled from "styled-components";

import { useLibraryStore } from "../../../../store/libraryStore";
import { useSteamderStore } from "../../../../store/steamderStore";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../../../store/authStore";
import { PlayersNotHavingGame } from "../../../molecules/steamder/end/PlayersNotHavingGame";

const HaventTheGameTitle = styled.p`
    margin-bottom: 0px;
    background: var(--bs-body-bg);
    height: 58px;
    padding-top: 11px;
    font-size: 25px;
    font-family: Abel, sans-serif;
`;

export const HaventTheGame = () => {
    const { user } = useAuthStore();
    const { steamder } = useSteamderStore();
    const { library } = useLibraryStore();

    const { t } = useTranslation('pages/steamder', { keyPrefix: 'result' });

    // check if the authenticated user have the game
    const userHaveTheGame = library.find(game => parseInt(game.game_id) === steamder?.choosed_game);

    // get all players without the game
    const playersWithoutGame = steamder?.players.filter(player => 
        player.player_id !== user?.id && !player.games.includes(steamder?.choosed_game || 0)
    ) || [];
    
    return (<>
        { !userHaveTheGame || playersWithoutGame.length > 0 && <div>
            <hr />
            { !userHaveTheGame && <HaventTheGameTitle className="text-center text-danger fw-bold">{ t('you_dont_have') }</HaventTheGameTitle> }
            { playersWithoutGame.length > 0 &&
                <PlayersNotHavingGame playersWithoutGame={playersWithoutGame} />
            }
        </div> } </>
    );
};