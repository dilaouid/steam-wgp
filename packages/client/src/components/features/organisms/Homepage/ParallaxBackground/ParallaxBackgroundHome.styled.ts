import styled from "styled-components";
import ParallaxImage from '@assets/images/homepage/parallax.png';

import { Col } from "react-bootstrap";

export const ParallaxHero = styled.div`
    height: 600px;
    background: center / cover;
    background-image: url(${ParallaxImage});
`;

export const HeroColumn = styled(Col)`
    z-index: 2;
    background: rgba(6,6,6,0.57);
`;