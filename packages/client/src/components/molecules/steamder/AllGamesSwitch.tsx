import styled from "styled-components";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const StyledSwitch = styled(Form.Check)`
    font-family: Abel, sans-serif;
    margin-bottom: 11px;
`;

const TooltipLabel = (message: string) =>
    <Tooltip id="switch-all-games-tooltip">
        { message }
    </Tooltip>;

interface AllGamesSwitchProps {
    active: boolean;
}

export const AllGamesSwitch: React.FC<AllGamesSwitchProps> = ({ active }) => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "waitlist.actions" });
    return (
        <OverlayTrigger placement="left" overlay={TooltipLabel(t('switch_tooltip'))} trigger={['hover', 'focus']}>
            <StyledSwitch checked={active} inline className="text-dark" type="switch" id="all-games-switch" label={t('switch')} />
        </OverlayTrigger>
    );
};