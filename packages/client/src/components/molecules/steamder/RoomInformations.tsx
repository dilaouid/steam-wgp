import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";

import { useAuthStore } from "../../../store/authStore";
import { useSteamderStore } from "../../../store/steamderStore";

import { RoomActions } from "./RoomActions";
import { AllGamesSwitch } from "./AllGamesSwitch";

import { IPlayer } from "../../../types/ISteamder";

const StyledContainer = styled.div`
    background: #000000ca;
`;

const NoMarginTopText = styled.p`
    margin-top: 0;
`;

export const RoomInformations: React.FC = () => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "waitlist.informations" });

    const { steamder } = useSteamderStore();
    const { user } = useAuthStore();

    const admin: IPlayer = steamder?.players.find(p => p.player_id == steamder.admin_id) as IPlayer;
    const isAdmin = admin?.player_id == user?.id;

    return (
        <StyledContainer className="text-center p-4 p-lg-5">
            <div className="user-select-none">
                { isAdmin && steamder && <NoMarginTopText className="text-info-emphasis">
                    <Trans t={t} i18nKey="waiting" values={{ username: admin?.username }} components={{ 1: <strong /> }} />
                </NoMarginTopText> }

                { steamder && <NoMarginTopText className="text-info">
                    <Trans t={t} i18nKey="in_list" values={{ count: steamder.display_all_games ? steamder.all_games : steamder.common_games }} components={{ 1: <strong /> }} />
                </NoMarginTopText> }
            </div>
            
            <RoomActions />
            { isAdmin && steamder && <AllGamesSwitch active={steamder.display_all_games} /> }
        </StyledContainer>
    );
};