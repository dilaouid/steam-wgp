import React from "react";
import { ShopPageColumn, WinnerColumn } from "@features/molecules/Steamder/Result";
import { StyledRow } from "./GameWinRow.styled";

interface GameWinRowProps {
    printShop: boolean;
}

export const GameWinRow: React.FC<GameWinRowProps> = ({ printShop }) => {
    return (
        <StyledRow>
            <WinnerColumn />
            { printShop && <ShopPageColumn /> }
        </StyledRow>
    )
};