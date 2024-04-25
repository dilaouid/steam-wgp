import { Link } from '@tanstack/react-router';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
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
        { !isAuthenticated &&
            <Link to={ BASE_URL + "/auth/steam" }>
                <Button variant='info' size='lg' className='me-2'>
                    { t('hero.login') }
                </Button>
            </Link>
        }
        <Link to={"/steamders"}>
            <Button variant={!isAuthenticated ? 'outline-info' : 'info'} size='lg'>
                <Trans t={t} i18nKey="hero.steamders" components={{ 1: <strong /> }} />
            </Button>
        </Link>
    </Section>);
}
