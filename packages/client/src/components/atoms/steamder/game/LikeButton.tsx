import styled from "styled-components";

import { Button } from "react-bootstrap";
import { IoHeart } from "react-icons/io5";
import { useTranslation } from "react-i18next";

import { swipeCard } from "../../../../services/websocket/send";

import { useSteamderStore } from "../../../../store/steamderStore";
import { useBtnGameStore } from "../../../../store/hoverBtnGameStore";

const StyledParagraph = styled.p`
    margin-left: 12px;
`;

export const LikeButton = () => {
    const { steamder, setSteamder } = useSteamderStore();
    const { setHoverLike } = useBtnGameStore();
    const { t } = useTranslation("pages/steamder", { keyPrefix: "game.actions" });

    const swipeGame = () => {
        if (!steamder) return;

        // check if there are games to swipe
        if (steamder.all_games.length == 0 && steamder.display_all_games)
            return;
        if (steamder.common_games.length == 0 && !steamder.display_all_games)
            return;
        if (steamder.display_all_games) {
            if (steamder.swiped_games.includes(steamder.all_games[0]))
                return;
            swipeCard(steamder.all_games[0]);
            // update swiped games, and all_games (remove the swiped game in all_games)
            setSteamder({ ...steamder, swiped_games: [...steamder.swiped_games, steamder.all_games[0]], all_games: steamder.all_games.slice(1) });
        } else {
            if (steamder.swiped_games.includes(steamder.common_games[0]))
                return;
            swipeCard(steamder.common_games[0]);
            // update swiped games, and common_games (remove the swiped game in common_games)
            setSteamder({ ...steamder, swiped_games: [...steamder.swiped_games, steamder.common_games[0]], common_games: steamder.common_games.slice(1) });
        }
    };

    const canLike = () => {
        if (!steamder) return false;
        if (steamder.all_games.length == 0 && steamder.display_all_games)
            return false;
        if (steamder.common_games.length == 0 && !steamder.display_all_games)
            return false;
        return true;
    };

    return (
        <StyledParagraph className="text-center text-sm-center text-md-start">
            <Button variant="danger" style={{ width: 165+'px', textAlign: 'left' }} onClick={swipeGame} 
                onMouseEnter={() => setHoverLike(true)}
                onMouseLeave={() => setHoverLike(false)}
                disabled={!canLike()}
            >
                <IoHeart />&nbsp; | { t('like') }
            </Button>
        </StyledParagraph>
    )
};