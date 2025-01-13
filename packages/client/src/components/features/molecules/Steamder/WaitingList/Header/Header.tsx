import { Trans, useTranslation } from "react-i18next";

import Skeleton from "react-loading-skeleton";

import { CopyIcon } from "@features/atoms/Steamder/CopyIcon/CopyIcon";

import { useSteamderStore } from "@store/steamderStore";
import { StyledContainer, StyledTitle } from "./Header.styled";

export const Header = () => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "steamder" });
    const { steamder } = useSteamderStore();

    return(
        <StyledContainer>
            <StyledTitle className="display-5 text-center text-warning">{
                steamder ? <>{ steamder.name } <CopyIcon steamderId={steamder.id} /></> : <Skeleton highlightColor="#444" baseColor="#333" width={50+'%'} enableAnimation />
            }</StyledTitle>
            <p className="font-monospace text-center">
                <Trans t={t} i18nKey="header" components={{ 1: <strong /> }} />
            </p>
        </StyledContainer>
    );
};