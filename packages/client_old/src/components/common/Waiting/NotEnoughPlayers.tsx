import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Room } from "../../../context";

const Paragraph = styled.p`
    margin-bottom: 0px;
`;

export const NotEnoughPlayers: React.FC = () => {
    const { room } = useContext(Room.Context)!;
    const { t } = useTranslation();
    if (!room || room.players.length > 1) return (<></>);

    return (<Paragraph className="text-dark text-opacity-25">{t('not_enough_players')}</Paragraph>);
}