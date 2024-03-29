import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAuthStore } from '../../store/authStore';

const Section = styled.div`
    max-width: 522px;
`;

const PinkText = styled.span`
    color: rgb(218, 48, 211);
    font-weight: bold;
`;

const PinkTextWhiteBackground = styled.span`
    color: rgb(231, 19, 210);
    background-color: rgb(255, 255, 255);
`;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const HeroSection = () => {
    const { t } = useTranslation('pages/homepage');
    const { isAuthenticated } = useAuthStore();

    return (<Section>
        <h1 className="text-uppercase fw-bold" data-aos="fade-down" data-aos-duration="800" data-aos-delay="400">
            <Trans t={t} i18nKey="hero.title" components={{ 1: <PinkTextWhiteBackground /> }} />
        </h1>
        <p className="my-3">
            <Trans t={t} i18nKey="hero.paragraph" components={{ 1: <PinkText /> }} />
        </p>
        { !isAuthenticated && <a className="btn btn-info btn-lg me-2" role="button" href={ BASE_URL + "/auth/steam" }>
            {t('hero.login')}
        </a> }
        <a className={`btn ${isAuthenticated ? 'btn-info' : 'btn-outline-info'} btn-lg`} role="button" href="/steamders">
            <Trans t={t} i18nKey="hero.steamders" components={{ 1: <strong /> }} />
        </a>
    </Section>);
}
