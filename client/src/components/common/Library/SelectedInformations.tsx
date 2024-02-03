import styled from "styled-components";
import { useTranslation } from 'react-i18next';

import { Library } from "../../../context";
import { useContext } from "react";

const AlertInfos = styled.div`
    z-index: 3;
    margin: 121px;
    margin-left: 25px;
    height: 33px;
    padding: 4px;
    width: 290px;
`;

const Bold = styled.strong`
    font-size: 11px;
`;

export default function SelectedInformationsComponent() {
    const { t } = useTranslation();

    const { library } = useContext(Library.Context)!;
    const selectedGames = library?.selected || [];

    const hiddenSelectedGamesCount = selectedGames.filter(id => 
        !library?.games.find(game => game.game_id === id)?.hidden
      ).length;
    const publicSelectedGamesCount = selectedGames.length - hiddenSelectedGamesCount;


    return (
        <AlertInfos className="alert alert-info text-center position-fixed bottom-0" role="alert">
            <Bold>{
                t('selected_info', {
                    count: selectedGames.length, 
                    hiddenCount: hiddenSelectedGamesCount, 
                    publicCount: publicSelectedGamesCount
                })
            }</Bold>
        </AlertInfos>
    );
}