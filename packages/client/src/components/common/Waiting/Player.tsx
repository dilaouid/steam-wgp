import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { StarIcon } from "../Icons/StarIcon";
import { ControllerIcon } from "../Icons/ControllerIcon";
import { ExclamationIcon } from "../Icons/ExclamationIcon";

import KickButton from "./KickButton";

import { PlayerInfo } from "../../../types/Player";

import { Auth, Room } from "../../../context";

import './Player.css';

const GamesInCommon = styled.p`
    margin-top: 7px;
`;

export default function Player({ player }: { player: PlayerInfo }) {
    const { room } = useContext(Room.Context)!;
    const { auth } = useContext(Auth.Context)!;
    const { t } = useTranslation();

    const loggedUserIsAdmin = auth.user?.id === room?.admin_id;
    const isLoggedUser = auth.user?.id === player.player_id;
    const loggedUser = room?.players.find(p => p.player_id === auth.user?.id);
    const gamesInCommon = loggedUser?.games.filter(g => player.games.includes(g)) ?? [];

    
    const hasNoCommonGamesWithAnyone = () => {
        if (!room) return false;
        return room.players.some(otherPlayer => {
            if (otherPlayer.player_id === player.player_id) {
                return false;
            }

            return !player.games.some(game => otherPlayer.games.includes(game));
        });
    };

    return (
    <div className="col-auto align-self-center">
        { player.player_id === room?.admin_id ? <StarIcon isLoggedUser={isLoggedUser} /> : <></> }
        { loggedUserIsAdmin && player.player_id !== room?.admin_id ? <KickButton playerId={player.player_id} /> : <></> }
        { !isLoggedUser && gamesInCommon.length !== 0 && hasNoCommonGamesWithAnyone() && <ExclamationIcon /> }
        <OverlayTrigger placement="top" overlay={<Tooltip id={`Tooltip for Player #${player.player_id}`}>{ player.username }</Tooltip>}>
            <img className={`img-fluid profil_picture_room ${!isLoggedUser ? 'other_player_wroom' : ''} ${gamesInCommon.length === 0 ? 'no_games_in_commun' : ''}`} src={`https://avatars.akamai.steamstatic.com/${player?.avatar_hash}_full.jpg`} loading="lazy" />
        </OverlayTrigger>
        { !isLoggedUser ?
        <OverlayTrigger placement="bottom" overlay={<Tooltip id={`Tooltip for Games in Commun with #${player.player_id}`}>{ t('x_games_in_common', {count: gamesInCommon.length}) }</Tooltip>}>
            <GamesInCommon className={`lead text-center text-bold ${gamesInCommon.length > 0 ? "text-primary" : "text-danger"}`}>
                { gamesInCommon.length }
                <ControllerIcon />
            </GamesInCommon>
        </OverlayTrigger> : <></>}
    </div>);
}