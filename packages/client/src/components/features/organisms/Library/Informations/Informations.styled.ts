import { Col as C, Row as R } from "react-bootstrap";
import styled from "styled-components";

export const Col = styled(C)`
    height: 50%;
    background: #060606c5;
    padding: 22px;
    border-radius: 27px;
    position: sticky;
    top: 15vh;
    z-index: 1;
    @media (max-width: 990px) {
        position: static;
        top: auto;
        height: auto;
        margin-top: 20px;
    }
`;

export const ButtonCol = styled(C)`
    margin-top: 4px;
`;

export const Row = styled(R)`
    font-family: Abel, sans-serif;
`;

export const StyledTitle = styled.h3`
    font-family: Agdasima, sans-serif;
`;