import styled from 'styled-components';
import { Col, Container, Row } from "react-bootstrap";

import ParallaxImage from '../../assets/images/homepage/parallax.png';
import { HeroSection } from '../molecules/HeroSection';

const ParallaxHero = styled.div`
    height: 600px;
    background: center / cover;
    background-image: url(${ParallaxImage});
`;

const HeroColumn = styled(Col)`
    z-index: 2;
    background: rgba(6,6,6,0.57);
`;

export const ParallaxBackgroundHome: React.FC = () => {
    return (
        <ParallaxHero data-bss-parallax-bg="true">
            <Container className="h-100">
                <Row className='h-100'>
                    <HeroColumn data-aos="fade-right" data-aos-duration="400" md={6} className="text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
                        <HeroSection />
                    </HeroColumn>
                </Row>
            </Container>
        </ParallaxHero>
    )
};