import styled from "styled-components";
import { Row, Col } from "react-bootstrap";

import { useSteamderStore } from "@store/steamderStore";
import { useAuthStore } from "@store/authStore";

import { hasNoCommonGamesWithAnyone } from "@core/utils/hasNoCommonGames";

import { DangerIcon } from "@features/atoms/Steamder/steamder/DangerIcon/DangerIcon";
import { ProfilPicture } from "@features/atoms/Steamder/steamder/ProfilePicture/ProfilPicture";
import { RoomAdminIcon } from "@features/atoms/Steamder/steamder/RoomAdminIcon/RoomAdminIcon";
import { GamesInCommon } from "@features/atoms/Steamder/steamder/GamesInCommon/GamesInCommon";
import { KickPlayerButton } from "@features/atoms/Steamder/steamder/KickPlayerButton/KickPlayerButton";

import { IPlayer } from "@core/types/ISteamder";

const StyledRow = styled(Row)`
    background: #060606c2;
    height: 250px;
`;

export const RoomPlayers = () => {
    const { steamder } = useSteamderStore();
    const { user } = useAuthStore();
    if (!steamder) return null;

    const admin: IPlayer = steamder?.players?.find(p => p.player_id == steamder?.admin_id) as IPlayer;
    const isAdmin = admin?.player_id == user?.id;

    return (
        <StyledRow className="justify-content-center g-1">
            { steamder && steamder?.players?.map(player => {
                const playerIsAdmin = admin?.player_id == player.player_id;
                const isAuthenticatedPlayer = user && user.id == player.player_id;

                const authenticatedPlayer = steamder.players.find(p => p.player_id == user?.id);
                const gamesInCommon = authenticatedPlayer?.games.filter(g => player.games.includes(g)) ?? [];

                const hasNoCommonWithAnyone = gamesInCommon.length !== 0 && hasNoCommonGamesWithAnyone(steamder, player);

                return (
                    <Col key={player.player_id} className="align-self-center" sm={"auto"}>
                        { playerIsAdmin && <RoomAdminIcon isOtherPlayer={!isAuthenticatedPlayer}/> }
                        { isAdmin && !playerIsAdmin && <KickPlayerButton username={player.username} playerId={player.player_id} steamderId={steamder.id}/> }
                        { !isAuthenticatedPlayer && hasNoCommonWithAnyone && <DangerIcon /> }
                        <ProfilPicture isOtherPlayer={!isAuthenticatedPlayer} disable={gamesInCommon.length == 0} player={player}/>
                        { !isAuthenticatedPlayer && <GamesInCommon commonGames={gamesInCommon.length} /> }
                    </Col>
                );
            }) }
        </StyledRow>
    );
};