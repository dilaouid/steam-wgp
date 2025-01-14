import { Container, Row } from "react-bootstrap";

import { HeroSection } from '@features/molecules/Homepage/HeroSection/HeroSection';

import { ParallaxHero, HeroColumn } from ".";

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