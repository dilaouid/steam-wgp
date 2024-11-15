import styled from "styled-components";
import { Col, Row } from "react-bootstrap"
import { FeatureHome } from "@atoms/homepage/Feature";
import { ClockHistoryIcon } from "@atoms/icons/features/ClockHistoryIcon";
import { ControllerIcon } from "@atoms/icons/features/ControllerIcon";
import { PeopleIcon } from "@atoms/icons/features/PeopleIcon";
import { Trans, useTranslation } from "react-i18next";

import FeaturesImage from '@assets/images/homepage/features.png';

const StyledFeaturesImage = styled.img`
    z-index: 10;
    min-height: 300px !important;
    margin-top: -130px;
    border-bottom-right-radius: 90px;
    border-bottom-left-radius: 90px;
    object-fit: cover;
`;

export const FeaturesHome: React.FC = () => {
    const { t } = useTranslation('pages/homepage');
    return (
    <div className="container-sm py-4 py-xl-5">
        <Row className="row-cols-1 row-cols-md-2">
            <Col style={{ zIndex: 2 }}>
                <StyledFeaturesImage className="img-fluid w-100 h-100 fit-cover user-select-none" data-aos="fade-up" data-aos-duration="500" id="features_image" src={FeaturesImage} />
            </Col>
            <Col sm={'auto'} className="text-muted d-flex flex-column justify-content-center p-4">
                <FeatureHome>
                    <ClockHistoryIcon />
                    <div>
                        <h4>{ t('features.1.title') }</h4>
                        <p>
                            <Trans t={t} i18nKey="features.1.subtitle" components={{ 1: <strong /> }} />
                        </p>
                    </div>
                </FeatureHome>
                <FeatureHome>
                    <ControllerIcon />
                    <div>
                        <h4>{ t('features.2.title') }</h4>
                        <p>
                            <Trans t={t} i18nKey="features.2.subtitle" components={{ 1: <strong /> }} />
                        </p>
                    </div>
                </FeatureHome>
                <FeatureHome last={true}>
                    <PeopleIcon />
                    <div>
                        <h4>{ t('features.3.title') }</h4>
                        <p>
                            <Trans t={t} i18nKey="features.3.subtitle" components={{ 1: <strong /> }} />
                        </p>
                    </div>
                </FeatureHome>
            </Col>
        </Row>
    </div>
    );
}