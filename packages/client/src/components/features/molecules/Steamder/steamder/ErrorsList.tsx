import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { useSteamderStore } from "@store/steamderStore";

import { NotMatchingGames } from "@features/atoms/Steamder/NotMatchingGames/NotMatchingGames";

import { findMismatchedPlayers } from "@core/utils/findMismatchedPlayers";
import { ISteamder } from "../../../../../core/types/ISteamder";

const NoMarginText = styled.p`
    margin-top: 0px;
`;

const StyledDiv = styled.div`
    font-size: 13px;
    font-style: italic;
`;

export const ErrorsList: React.FC = () => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "steamder.errors" });
    const { steamder } = useSteamderStore();
    if (!steamder) return null;

    const mismatchedPlayers = findMismatchedPlayers(steamder as ISteamder);

    return (
        <StyledDiv>
            {mismatchedPlayers.map((players, index) => (
                <NotMatchingGames key={index} player1={players.player1} player2={players.player2} />
            ))}
            { steamder && steamder.players?.length < 2 && <NoMarginText className="text-dark text-opacity-25">{t("not_enough_players")}</NoMarginText> }
        </StyledDiv>
    );
};