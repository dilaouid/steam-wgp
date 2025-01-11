import { Image } from "react-bootstrap";
import styled from "styled-components";

export const StyledImage = styled(Image)<{ $isOtherPlayer: boolean, $disabled: boolean }>`
    width: 120px;
    box-shadow: 0px 0px 19px 0px var(--bs-warning);
    border-radius: 23px;
    user-select: none;
    transition: all 0.5s;
    &:hover {
        box-shadow: 0px 0px 19px 0px var(--bs-yellow);
        width: 115px;
    }
    ${props => props.$isOtherPlayer ? `margin-top: 52px;` : ''}
    ${props => props.$disabled ? `filter: grayscale(100%); opacity: 0.40;` : ``}
`;