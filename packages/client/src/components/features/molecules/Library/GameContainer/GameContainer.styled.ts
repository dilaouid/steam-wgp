import styled from "styled-components";
import { BsShieldLockFill } from "react-icons/bs";

export const GameHomepageContainer = styled.div<{ $selected?: boolean }>`
    position: relative;
    display: inline-block;
    width: 145px;
    height: 218px;
    border-radius: 20px;
    &::before {
        content: "";
        position: absolute;
        top: -3px;
        right: -3px;
        bottom: -3px;
        left: -3px;
        border: 4px solid transparent;
        border-radius: 20px;
        z-index: 0;
        transition: border-color .4s;
        border-color: ${props => props.$selected ? 'var(--bs-info)' : 'transparent'};
    }
`;

export const LockIcon = styled(BsShieldLockFill)`
    opacity: .5;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 2;
    font-size: 5vw;
`;