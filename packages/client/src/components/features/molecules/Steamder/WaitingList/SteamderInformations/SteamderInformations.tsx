import { Trans, useTranslation } from "react-i18next";

import { useAuthStore } from "@steamwgp/shared-ui"
import { useSteamderStore } from "@store/steamderStore";

import { RoomActions } from "../Actions/Actions";
import { AllGamesSwitch } from "../AllGamesSwitch/AllGamesSwitch";
import { ErrorsList } from "../ErrorsList";

import type { IPlayer } from "@core/types/ISteamder";

import { NoMarginTopText, Container } from "./SteamderInformations.styled";

export const SteamderInformations: React.FC = () => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "steamder.informations" });

    const { steamder } = useSteamderStore();
    const { user } = useAuthStore();
    if (!steamder) return null;

    const admin: IPlayer = steamder?.players?.find(p => p.player_id == steamder.admin_id) as IPlayer;
    const isAdmin = admin?.player_id == user?.id;

    return (
        <Container className="text-center p-4 p-lg-5">
            <div className="user-select-none">
                { !isAdmin && steamder && <NoMarginTopText className="text-info-emphasis">
                    <Trans t={t} i18nKey="waiting" values={{ username: admin?.username }} components={{ 1: <strong /> }} />
                </NoMarginTopText> }

                { steamder && <NoMarginTopText className="text-info">
                    <Trans t={t} i18nKey="in_list" values={{ count: steamder.display_all_games ? steamder.all_games.length : steamder.common_games.length }} components={{ 1: <strong /> }} />
                </NoMarginTopText> }
            </div>
            
            <RoomActions />
            { isAdmin && steamder && <AllGamesSwitch active={steamder.display_all_games} /> }
            <ErrorsList />
        </Container>
    );
};