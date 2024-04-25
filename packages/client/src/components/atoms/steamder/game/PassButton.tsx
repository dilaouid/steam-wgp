import styled from "styled-components";

import { Button } from "react-bootstrap";
import { IoSadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

import { useBtnGameStore } from "../../../../store/hoverBtnGameStore";
import { useSteamderStore } from "../../../../store/steamderStore";

const StyledParagraph = styled.p`
    margin-left: 12px;
`;

export const PassButton = () => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "game.actions" });
    const { setHoverPass } = useBtnGameStore();
    const { steamder, setSteamder } = useSteamderStore();

    const passGame = () => {
        if (!steamder) return;
        if (steamder.all_games.length == 0 && steamder.display_all_games)
            return;
        if (steamder.common_games.length == 0 && !steamder.display_all_games)
            return;

        if (steamder.display_all_games) {
            if (steamder.swiped_games?.includes(steamder.all_games[0]))
                return;
            // put the game in the last position of all_games
            setSteamder({ ...steamder, all_games: [...steamder.all_games.slice(1), steamder.all_games[0]] });
        } else {
            if (steamder.swiped_games?.includes(steamder.common_games[0]))
                return;
            // put the game in the last position of common_games
            setSteamder({ ...steamder, common_games: [...steamder.common_games.slice(1), steamder.common_games[0]] });
        }
    };

    const canPass = () => {
        if (!steamder) return false;
        if (steamder.all_games.length == 0 && steamder.display_all_games)
            return false;
        if (steamder.common_games.length == 0 && !steamder.display_all_games)
            return false;
        return true;
    };

    return (
        <StyledParagraph className="text-center text-sm-center text-md-start">
            <Button variant="secondary" style={{ width: 165+'px', textAlign: 'left' }} 
                onMouseEnter={() => setHoverPass(true)}
                onMouseLeave={() => setHoverPass(false)}
                onClick={passGame}
                disabled={!canPass()}
            >
                <IoSadOutline />&nbsp; | { t('pass') }
            </Button>
        </StyledParagraph>
    )
};