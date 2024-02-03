import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Room } from "../context";

import { CopyIcon } from "../components/common/Icons/CopyIcon";

import { RoomInformations } from "../components/common/Waiting/RoomInformations";
import { RoomActionButtons } from "../components/common/Waiting/RoomActionButtons";
import { NotInCommonGames } from "../components/common/Waiting/NotInCommonGames";
import { NotEnoughPlayers } from "../components/common/Waiting/NotEnoughPlayers";
import Player from "../components/common/Waiting/Player";

const RoomID = styled.span`
    font-weight: normal !important;
`;

const WarningLabels = styled.div`
    font-size: 13px;
    font-style: italic;
    margin-top: 9px;
    text-align: center;
`;

export default function WaitingPage() {
    const { room } = useContext(Room.Context)!;
    const navigate = useNavigate();

    if (!room) {
        navigate('/steam-wgp/')
        return <></>
    }

    return (
        <div className="container">
            <div className="text-center p-4 p-lg-5">
                <div>
                    <p className="fw-bold text-primary mb-2">
                        Room ID: <RoomID>{ room.id } <CopyIcon /></RoomID>
                    </p>
                </div>
            </div>
            <div className="row gy-1 justify-content-center">
                { room.players.map((player, index) => {
                    return <Player key={index} player={player} />
                }) }
            <RoomInformations />
            <RoomActionButtons />
            <WarningLabels>
                <NotInCommonGames />
                <NotEnoughPlayers />
            </WarningLabels>
        </div>
    </div>
    );
}