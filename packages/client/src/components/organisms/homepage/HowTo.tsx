import { Col, Container, Row } from "react-bootstrap";
import { SteamIcon } from "@atoms/icons/howto/SteamIcon";
import { RocketIcon } from "@atoms/icons/howto/RocketIcon";
import { PeopleIcon } from "@atoms/icons/howto/PeopleIcon";
import { ControllerIcon } from "@atoms/icons/howto/ControllerIcon";

import { Trans, useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { StyledTitle } from "@atoms/homepage/StyledTitle";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const HowTo: React.FC = () => {
    const { t } = useTranslation('pages/homepage');
    const icons = [ <SteamIcon />, <PeopleIcon />, <RocketIcon />, <ControllerIcon /> ];

    return (
        <Container className="py-4 py-xl-5">

            <Row className="mb-5" data-aos="zoom-out">
                <Col md={8} xl={6} className="text-center mx-auto">
                    <StyledTitle>{ t('howto.title') }</StyledTitle>
                    <p className="w-lg-50">
                        <Trans t={t} i18nKey="howto.subtitle" components={{ 1: <strong /> }} />
                    </p>
                </Col>
            </Row>

            <Row className="text-body-tertiary">

                {icons.map((icon, index) => (
                    <Col sm={12} md={6} lg={3} key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                        <div className="d-flex p-3">
                            { icon }
                            <div className="px-2">
                                <h5 className="mb-0 mt-1">{ t(`howto.${index + 1}.title`) }</h5>
                                <p>
                                    <Trans t={t} i18nKey={`howto.${index + 1}.subtitle`} components={{ 1: <strong />, 2: <Link to={ BASE_URL + "/auth/steam" } /> }} />
                                </p>
                            </div>
                        </div>
                    </Col>
                ))}

            </Row>

        </Container>
    );
};