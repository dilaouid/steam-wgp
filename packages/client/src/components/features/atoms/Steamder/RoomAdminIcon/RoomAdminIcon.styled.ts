import styled from "styled-components";
import { GiCrownedHeart } from "react-icons/gi";

export const StyledGiCrownedHeart = styled(GiCrownedHeart)<{$isOtherPlayer: boolean}>`
    position: absolute;
    color: var(--bs-warning);
    font-size: 44px;
    ${props => props.$isOtherPlayer ? `margin-top: 45px;margin-left:-10px;` : 'margin: -14px;'}
    background: #9933cc9c;
    box-shadow: 0px 0px 20px 4px var(--bs-yellow);
    transition: all 0.5s;
    &:hover {
        background: #9933cc;
        box-shadow: 0px 0px 20px 4px var(--bs-warning);
        font-size: 48px;
    }
`;