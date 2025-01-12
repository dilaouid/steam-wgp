import React from "react";
import styled from "styled-components";

import { Row } from "react-bootstrap";
import { ShopPageColumn, WinnerColumn } from "@features/molecules/Steamder/Result";

const StyledRow = styled(Row)`
    margin-bottom: 17px;
`;

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