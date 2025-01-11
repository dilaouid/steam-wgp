import styled from "styled-components";

import { Col as C } from "react-bootstrap";

export const Image = styled.img`
    z-index: 10;
    min-height: 300px !important;
    margin-top: -130px;
    border-bottom-right-radius: 90px;
    border-bottom-left-radius: 90px;
    object-fit: cover;
`;

export const Col = styled(C)`
    z-index: 2;
`;