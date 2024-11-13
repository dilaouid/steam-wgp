import styled from "styled-components";

import { Col, Button } from "react-bootstrap";
import { BsSteam } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useSteamderStore } from "@store/steamderStore";

const StyledCol = styled(Col)`
    margin-top: 17px;
    text-align: center;
`;

export const ShopPageColumn = () => {
    const { steamder } = useSteamderStore();
    const { t } = useTranslation('pages/steamder', { keyPrefix: 'result' });

    return (
        <StyledCol>
            <Button variant="info" href={`https://store.steampowered.com/app/${steamder?.choosed_game}`} target="_blank" rel="noreferrer">
                <BsSteam /> &nbsp; |&nbsp; { t('shop') }
            </Button>
        </StyledCol>
    )
};