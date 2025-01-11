import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { useSteamderStore } from "@store/steamderStore";

import { drawToast } from "@core/utils/drawToast";
import { useTranslation } from "react-i18next";

import { StyledIcon } from ".";

export const CopyIcon = () => {
    const { steamder } = useSteamderStore();
    const { t } = useTranslation("pages/steamder", { keyPrefix: "steamder.actions" });

    const TooltipLabel = (message: string) =>
        <Tooltip id="share-steamder-tooltip">
            { message }
        </Tooltip>
    
    const copySteamderLink = () => {
        if (!steamder) return;
        drawToast("link_copied", 'info');
        navigator.clipboard.writeText(`${window.location.origin}/steamder/${steamder.id}`);
    };

    return (<OverlayTrigger placement="right" overlay={TooltipLabel( t('share') )} trigger={['hover', 'focus']}>
            <span>
              <StyledIcon onClick={copySteamderLink} />
            </span>
        </OverlayTrigger>)
};
