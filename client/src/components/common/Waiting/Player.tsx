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

    return (
    <div className="col-auto align-self-center">
        { player.player_id === room?.admin_id ? <StarIcon /> : <></> }
        { loggedUserIsAdmin && player.player_id !== room?.admin_id ? <KickButton playerId={player.player_id} /> : <></> }
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`Tooltip for Player #${player.player_id}`}>{ player.username }</Tooltip>}
        >
            <img className="img-fluid profil_picture_room" src={`https://avatars.akamai.steamstatic.com/${player?.avatar_hash}_full.jpg`} loading="lazy" />
        </OverlayTrigger>
        { !isLoggedUser ?
        <GamesInCommon className="lead text-center text-primary text-bold" data-bs-toggle="tooltip" data-bss-tooltip="" data-bs-placement="bottom" title="9 games in common">
            { loggedUser?.games.filter(g => player.games.includes(g)).length }
            <ControllerIcon />
        </GamesInCommon> : <></>}
    </div>);
}