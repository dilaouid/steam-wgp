import styled from "styled-components"
import Lottie from "lottie-react";
import LoadingController from '@assets/lottie/loader.json';
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const StyledLottie = styled(Lottie)`
    width: 450px;
    overflow: hidden;
    margin-top: -150px;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    z-index: 1;
    position: relative;
`;

const StyledLoaderText = styled.p`
    font-size: 24px;
    font-weight: bold;
    margin-top: 80px;
`;

export const Loader: React.FC = () => {
    const { t } = useTranslation('translation');

    return (
        <Row className="g-0 justify-content-center align-items-center">
            <Col className="text-center align-self-center" sm={"auto"}>
                <StyledLoaderText className="text-warning">{ t('loading') }</StyledLoaderText>
                <StyledLottie animationData={LoadingController} />
            </Col>
        </Row>
    )
}