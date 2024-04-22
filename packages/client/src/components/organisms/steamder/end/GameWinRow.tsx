import styled from "styled-components";

import { Row } from "react-bootstrap";
import { WinnerColumn } from "../../../molecules/steamder/end/WinnerColumn";
import { ShopPageColumn } from "../../../molecules/steamder/end/ShopPageColumn";
import { useSteamderStore } from "../../../../store/steamderStore";

const StyledRow = styled(Row)`
    margin-bottom: 17px;
`;

export const GameWinRow = () => {
    const { steamder } = useSteamderStore();
    return (
        <StyledRow>
            <WinnerColumn />
            { steamder?.display_all_games && <ShopPageColumn /> }
        </StyledRow>
    )
};