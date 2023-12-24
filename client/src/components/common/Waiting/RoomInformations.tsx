import { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../../../context/AuthProvider";
import { RoomContext } from "../../../context/RoomProvider";
import { WaitingAdmin } from "./WaitingAdmin";

const RoomInformationDiv = styled.div`
    cursor: default;
    user-select: none;
`;

export const RoomInformations: React.FC = () => {
    const { room } = useContext(RoomContext)!;
    const { auth } = useContext(AuthContext)!;

    return (
    <div className="text-center p-4 p-lg-5">
        <RoomInformationDiv>
            { auth.user.id !== room?.admin_id ? <WaitingAdmin /> : <></> }
        </RoomInformationDiv>
    </div>);
}