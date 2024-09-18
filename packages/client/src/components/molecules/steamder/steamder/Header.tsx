import styled from "styled-components";
import { Container } from "react-bootstrap";

import { Trans, useTranslation } from "react-i18next";

import Skeleton from "react-loading-skeleton";

import { CopyIcon } from "../../../atoms/steamder/steamder/CopyIcon";

import { useSteamderStore } from "../../../../store/steamderStore";

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
    const { t } = useTranslation("pages/steamder", { keyPrefix: "steamder" });
    const { steamder } = useSteamderStore();

    return(
        <StyledContainer>
            <StyledTitle className="display-5 text-center text-warning">{
                steamder ? <>{ steamder.name } <CopyIcon /></> : <Skeleton highlightColor="#444" baseColor="#333" width={50+'%'} enableAnimation />
            }</StyledTitle>
            <p className="font-monospace text-center">
                <Trans t={t} i18nKey="header" components={{ 1: <strong /> }} />
            </p>
        </StyledContainer>
    );
};