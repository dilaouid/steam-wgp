import styled from "styled-components";
import { HiOutlineShare } from "react-icons/hi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { useSteamderStore } from "../../../../store/steamderStore";

import { drawToast } from "../../../../utils/drawToast";
import { useTranslation } from "react-i18next";

const StyledIcon = styled(HiOutlineShare)`
  font-size: 24px;
  cursor: pointer;
  transition: .5s;
  opacity: 0.5;
  &:hover {
    color: #f0ad4e;
    transform: scale(1.2);
    opacity: 1;
  }
`;

export const CopyIcon = () => {
    const { steamder } = useSteamderStore();
    const { t } = useTranslation("pages/steamder", { keyPrefix: "waitlist.actions" });

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
            <span><StyledIcon onClick={copySteamderLink} /></span>
        </OverlayTrigger>)
};
