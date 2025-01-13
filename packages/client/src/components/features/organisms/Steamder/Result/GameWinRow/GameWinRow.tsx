import React from "react";
import { ShopPageButton, SelectedGame } from "@features/molecules/Steamder/Result";
import { StyledRow } from "./GameWinRow.styled";

interface GameWinRowProps {
    printShop: boolean;
}

export const GameWinRow: React.FC<GameWinRowProps> = ({ printShop }) => {
    return (
        <StyledRow>
            <SelectedGame />
            { printShop && <ShopPageButton /> }
        </StyledRow>
    )
};