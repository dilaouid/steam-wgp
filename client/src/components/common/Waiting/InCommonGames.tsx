import { useContext } from "react";
import { Trans } from 'react-i18next';

import styled from "styled-components";

import { Room } from "../../../context";

const Paragraph = styled.p`
    margin-bottom: 0px;
`;

export const InCommonGames: React.FC = () => {
    const { room } = useContext(Room.Context)!;
    if (!room) return (<></>);

    return (<Paragraph className={`${room.commonGames.length > 0 ? 'text-primary' : 'text-danger'}`}>
        <Trans
            i18nKey='x_games_in_list'
            count={room.commonGames.length}
            components={[<strong key="0" />]}
        />
        </Paragraph>);
}