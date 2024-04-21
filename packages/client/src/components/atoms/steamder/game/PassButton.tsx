import styled from "styled-components";

import { Button } from "react-bootstrap";
import { IoSadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

import { useBtnGameStore } from "../../../../store/hoverBtnGameStore";

const StyledParagraph = styled.p`
    margin-left: 12px;
`;

export const PassButton = () => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "game.actions" });
    const { setHoverPass } = useBtnGameStore();

    return (
        <StyledParagraph className="text-center text-sm-center text-md-start">
            <Button variant="secondary" style={{ width: 165+'px', textAlign: 'left' }} 
                onMouseEnter={() => setHoverPass(true)}
                onMouseLeave={() => setHoverPass(false)}
            >
                <IoSadOutline />&nbsp; | { t('pass') }
            </Button>
        </StyledParagraph>
    )
};