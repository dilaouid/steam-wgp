import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Row, Col, Button } from "react-bootstrap";

import { useSteamderStore } from "../../../store/steamderStore";
import { useAuthStore } from "../../../store/authStore";

import { IPlayer } from "../../../types/ISteamder";

const StyledRow = styled(Row)`
    height: 91px;
`;

export const RoomActions: React.FC = () => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "waitlist.actions" });
    const { steamder } = useSteamderStore();
    const { user } = useAuthStore();

    if (!steamder) return null;

    const admin: IPlayer = steamder.players?.find(p => p.player_id == steamder.admin_id) as IPlayer;
    const isAdmin = admin?.player_id == user?.id;

    return (
        <StyledRow className="justify-content-center">
            { isAdmin && <Col sm={"auto"} className="align-self-center">
                <Button variant="outline-info" className="shadow">{t('start')}</Button>
            </Col> }
            <Col sm={"auto"} className="align-self-center">
                <Button variant="outline-danger" className="shadow">{t('leave')}</Button>
            </Col>
        </StyledRow>
    );
};