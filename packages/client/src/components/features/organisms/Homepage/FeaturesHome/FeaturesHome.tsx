import { Col, Row } from "react-bootstrap"

import { FeatureHome } from "@features/atoms/Homepage/Features/Feature/Feature";
import { FeaturesImage } from "@features/atoms/Homepage/Features/Image/FeaturesImage";

import { People, FeaturesControllerIcon, ClockHistoryIcon } from "@ui/atoms";

import { Trans, useTranslation } from "react-i18next";

export const FeaturesHome: React.FC = () => {
    const { t } = useTranslation('pages/homepage');
    return (
    <div className="container-sm py-4 py-xl-5">
        <Row className="row-cols-1 row-cols-md-2">
            <FeaturesImage />
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
                    <FeaturesControllerIcon />
                    <div>
                        <h4>{ t('features.2.title') }</h4>
                        <p>
                            <Trans t={t} i18nKey="features.2.subtitle" components={{ 1: <strong /> }} />
                        </p>
                    </div>
                </FeatureHome>
                <FeatureHome last={true}>
                    <People />
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