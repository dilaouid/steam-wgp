import { Button } from "react-bootstrap";
import { BsSteam } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useSteamderStore } from "@store/steamderStore";

import { Col } from "./ShopPageButton.styled";

export const ShopPageButton = () => {
    const { steamder } = useSteamderStore();
    const { t } = useTranslation('pages/steamder', { keyPrefix: 'result' });

    return (
        <Col>
            <Button variant="info" href={`https://store.steampowered.com/app/${steamder?.choosed_game}`} target="_blank" rel="noreferrer">
                <BsSteam /> &nbsp; |&nbsp; { t('shop') }
            </Button>
        </Col>
    )
};