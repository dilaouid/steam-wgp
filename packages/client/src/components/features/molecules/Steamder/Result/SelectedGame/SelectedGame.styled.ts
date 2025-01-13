import { Col as C } from "react-bootstrap";
import styled from "styled-components";

export const Col = styled(C)`
    margin-top: 36px;
    text-align: center;
`;

export const Choosen = styled.p`
    overflow: hidden;
    z-index: 3;
    width: 100%;
    font-size: 97px;
    font-family: Abel, sans-serif;
    text-shadow:
        0px 0px 11px var(--bs-body-bg),
        0px 0px 15px,
        0px 0px 20px var(--bs-secondary-bg);
    position: absolute;
    margin-top: 287px;
    transform: scale(0);
    @keyframes fadeInAndZoom {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes fadeOutAndDezoom {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    animation: fadeInAndZoom 3s 4s forwards, fadeOutAndDezoom 3s 7s forwards;
`;