import { useTranslation } from "react-i18next";

import { useSteamderStore } from "@store/steamderStore";
import { useAuthStore } from "@store/authStore";
import { PlayersNotHavingGame } from "@features/molecules/Steamder/Result/PlayersNotHavingGame";

import { DoesntHaveTheGame, HaventTheGameTitle } from "./HaventTheGame.styled";

export const HaventTheGame = () => {
    const { user } = useAuthStore();
    const { steamder } = useSteamderStore();

    const { t } = useTranslation('pages/steamder', { keyPrefix: 'result' });

    // get the authenticated player in the steamder room
    const player = steamder?.players.find(player => player.player_id === user?.id);

    const userHaveTheGame = player?.games.includes(steamder?.choosed_game || 0);

    // get all players without the game
    const playersWithoutGame = steamder?.players.filter(player => 
        player.player_id !== user?.id && !player.games.includes(steamder?.choosed_game || 0)
    ) || [];

    const displayComponent = !userHaveTheGame || playersWithoutGame?.length > 0
    
    return (<>
        { displayComponent && <div>
            <hr />
            { !userHaveTheGame && <HaventTheGameTitle className="text-center text-danger fw-bold">{ t('you_dont_have') }</HaventTheGameTitle> }
            { playersWithoutGame.length > 0 &&
                <>
                    <DoesntHaveTheGame className="text-center text-warning fw-bold">
                        { t('players_dont_have', { count: playersWithoutGame.length }) }
                    </DoesntHaveTheGame>
                    <PlayersNotHavingGame playersWithoutGame={playersWithoutGame} />
                </>
            }
        </div> } </>
    );
};