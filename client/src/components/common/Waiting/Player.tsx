import { useContext } from "react";
import styled from "styled-components";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { StarIcon } from "../Icons/StarIcon";
import { ControllerIcon } from "../Icons/ControllerIcon";

import KickButton from "./KickButton";

import { PlayerInfo } from "../../../types/Player";

import { AuthContext } from "../../../context/AuthProvider";
import { RoomContext } from "../../../context/RoomProvider";

import './Player.css';

const GamesInCommon = styled.p`
    margin-top: 7px;
`;

export default function Player({ player }: { player: PlayerInfo }) {
    const { room } = useContext(RoomContext)!;
    const { auth } = useContext(AuthContext)!;

    const loggedUserIsAdmin = auth.user?.id === room?.admin_id;
    const isLoggedUser = auth.user?.id === player.player_id;
    const loggedUser = room?.players.find(p => p.player_id === auth.user?.id);
    const gamesInCommon = loggedUser?.games.filter(g => player.games.includes(g)) ?? [];

    return (
    <div className="col-auto align-self-center">
        { player.player_id === room?.admin_id ? <StarIcon isLoggedUser={isLoggedUser} /> : <></> }
        { loggedUserIsAdmin && player.player_id !== room?.admin_id ? <KickButton playerId={player.player_id} /> : <></> }
        <OverlayTrigger placement="top" overlay={<Tooltip id={`Tooltip for Player #${player.player_id}`}>{ player.username }</Tooltip>}>
            <img className={`img-fluid profil_picture_room ${!isLoggedUser ? 'other_player_wroom' : ''}`} src={`https://avatars.akamai.steamstatic.com/${player?.avatar_hash}_full.jpg`} loading="lazy" />
        </OverlayTrigger>
        { !isLoggedUser ?
        <OverlayTrigger placement="bottom" overlay={<Tooltip id={`Tooltip for Games in Commun with #${player.player_id}`}>{ gamesInCommon.length } jeu{ gamesInCommon.length > 1 ? 'x' : ''} en commun</Tooltip>}>
            <GamesInCommon className="lead text-center text-primary text-bold">
                { gamesInCommon.length }
                <ControllerIcon />
            </GamesInCommon>
        </OverlayTrigger> : <></>}
    </div>);
}