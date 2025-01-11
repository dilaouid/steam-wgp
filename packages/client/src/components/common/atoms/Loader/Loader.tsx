import LoadingController from '@assets/lottie/loader.json';
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { StyledLoaderText, StyledLottie } from "./Loader.style";

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