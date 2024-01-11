import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components"
import { Auth } from "../../../context";
import { Trans } from "react-i18next";

const Heading = styled.div`
    cursor: default;
    user-select: none;
`;

const Title = styled.h4`
    margin-bottom: 37px;
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
`;

export default function HomePageHeadingComponent() {
    const { auth } = useContext(Auth.Context)!;
    const { t } = useTranslation();

    return (
    <div className="text-center p-4 p-lg-5 animate__animated animate__fadeIn">
        <Heading>
            <p className="text-primary mb-2">
                <Trans
                    i18nKey='welcome_username'
                    values={{ username: auth.user.username }}
                    components={[<strong key="0" />]}
                />
            </p>
            <Title className="text-center text-primary-emphasis">{t('homepage_subtitle')}</Title>
        </Heading>
    </div>);
}