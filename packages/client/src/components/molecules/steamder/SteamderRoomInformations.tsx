import styled from "styled-components";

import { Spinner } from "react-bootstrap";

import { useAuthStore } from "../../../store/authStore";
import { useSteamderStore } from "../../../store/steamderStore";

import { SteamderRoomActions } from "./SteamderRoomActions";
import { SteamderAllGamesSwitch } from "./SteamderAllGamesSwitch";

import { IPlayer } from "../../../types/ISteamder";

const StyledContainer = styled.div`
    background: #000000ca;
`;

const NoMarginTopText = styled.p`
    margin-top: 0;
`;

export const SteamderRoomInformations: React.FC = () => {
    const { steamder } = useSteamderStore();
    const { user } = useAuthStore();

    const admin: IPlayer = steamder?.players.find(p => p.player_id == steamder.admin_id) as IPlayer;
    const isAdmin = admin?.player_id == user?.id;

    return (
        <StyledContainer className="text-center p-4 p-lg-5">
            <div className="user-select-none">
                { !isAdmin && <><Spinner animation="border" variant="info" size="sm" />
                <NoMarginTopText className="lead text-info-emphasis">
                    Waiting for <strong>{ admin?.username }</strong> to start the room ...
                </NoMarginTopText></> }

                <NoMarginTopText className="text-info">
                    <strong>{ steamder?.common_games } games</strong> in the list
                </NoMarginTopText>
            </div>
            
            <SteamderRoomActions />
            { isAdmin && <SteamderAllGamesSwitch /> }
        </StyledContainer>
    );
};