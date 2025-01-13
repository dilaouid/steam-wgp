import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { drawToast } from "@core/utils/drawToast";
import { useTranslation } from "react-i18next";

import { StyledOutlineShareIcon } from ".";

export const CopyIcon: React.FC<{ steamderId: string }> = ({ steamderId }) => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "steamder.actions" });

    const TooltipLabel = (message: string) =>
        <Tooltip id="share-steamder-tooltip">
            { message }
        </Tooltip>
    
    const copySteamderLink = () => {
        drawToast("link_copied", 'info');
        navigator.clipboard.writeText(`${window.location.origin}/steamder/${steamderId}`);
    };

    return (<OverlayTrigger placement="right" overlay={TooltipLabel( t('share') )} trigger={['hover', 'focus']}>
            <span>
              <StyledOutlineShareIcon onClick={copySteamderLink} />
            </span>
        </OverlayTrigger>)
};
