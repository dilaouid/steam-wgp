import { useContext } from "react";
import styled from "styled-components";

import { Auth, Room } from "../../../context";

import { WaitingAdmin } from "./WaitingAdmin";
import { InCommonGames } from "./InCommonGames";

const RoomInformationDiv = styled.div`
    cursor: default;
    user-select: none;
`;

export const RoomInformations: React.FC = () => {
    const { room } = useContext(Room.Context)!;
    const { auth } = useContext(Auth.Context)!;

    return (
    <div className="text-center p-4 p-lg-5">
        <RoomInformationDiv>
            { auth.user.id !== room?.admin_id ? <WaitingAdmin /> : <></> }
            <InCommonGames />
        </RoomInformationDiv>
    </div>);
}