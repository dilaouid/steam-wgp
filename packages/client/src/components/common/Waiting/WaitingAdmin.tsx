import { useContext } from "react";
import { Trans } from "react-i18next";
import styled from "styled-components";

import { Room } from "../../../context";

import { Spinner } from "react-bootstrap";

const Paragraph = styled.p`
    margin-bottom: 0px;
`;

export const WaitingAdmin: React.FC = () => {
    const { room } = useContext(Room.Context)!;

    const roomAdmin = room?.players.find(p => p.player_id === room.admin_id);

    return (<Paragraph className="text-primary-emphasis">
        <Spinner size="sm" animation="border" variant="primary" role="status" />&nbsp; &nbsp;<Trans i18nKey="waiting_for_admin" values={{username: roomAdmin?.username}} components={[<strong key="0" />]} />
    </Paragraph>);
}