import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { switchDisplayGames } from "@core/services/WebSockets/send";
import { StyledSwitch, AllGamesSwitchProps } from ".";

const TooltipLabel = (message: string) =>
    <Tooltip id="switch-all-games-tooltip">
        { message }
    </Tooltip>;

export const AllGamesSwitch: React.FC<AllGamesSwitchProps> = ({ active }) => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "steamder.actions" });
    return (
        <OverlayTrigger flip={true} placement="left" overlay={TooltipLabel(t('switch_tooltip'))} trigger={['hover', 'focus']}>
            <StyledSwitch defaultChecked={active} inline className="text-dark" type="switch" id="all-games-switch" label={t('switch')} onChange={switchDisplayGames} />
        </OverlayTrigger>
    );
};