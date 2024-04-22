import styled from "styled-components";

import { Row } from "react-bootstrap";
import { WinnerColumn } from "../../../molecules/steamder/end/WinnerColumn";

const StyledRow = styled(Row)`
    margin-bottom: 17px;
`;

export const GameWinRow = () => {
    return (
        <StyledRow>
            <WinnerColumn />
        </StyledRow>
    )
};