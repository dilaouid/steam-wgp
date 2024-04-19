import styled from "styled-components";
import { Container } from "react-bootstrap";
import { MdContentCopy } from "react-icons/md";

import { Trans, useTranslation } from "react-i18next";

import Skeleton from "react-loading-skeleton";

import { useSteamderStore } from "../../../store/steamderStore";
import { drawToast } from "../../../utils/drawToast";

const StyledContainer = styled(Container)`
    background: #000000cc;
    margin-top: 21px;
`;

const StyledTitle = styled.h3`
    height: 76.5938px;
    padding-top: 8px;
    font-family: Abel, sans-serif;
    margin-bottom: -7px;
`;

export const Header = () => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "waitlist" });
    const { steamder } = useSteamderStore();

    const copySteamderLink = () => {
        if (!steamder) return;
        drawToast("link_copied", 'info');
        navigator.clipboard.writeText(`${window.location.origin}/steamder/${steamder.id}`);
    };

    return(
        <StyledContainer>
            <StyledTitle className="display-5 text-center text-warning">{
                steamder ? <>{ steamder.name } <MdContentCopy role="button" onClick={copySteamderLink}/></> : <Skeleton highlightColor="#444" baseColor="#333" width={50+'%'} enableAnimation />
            }</StyledTitle>
            <p className="font-monospace text-center">
                <Trans t={t} i18nKey="header" components={{ 1: <strong /> }} />
            </p>
        </StyledContainer>
    );
};