import { Link } from '@tanstack/react-router';
import { Trans, useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { useAuthStore } from "@steamwgp/shared-ui"
import { PinkText, PinkTextWhiteBackground, Section } from '.';

import { BASE_URL } from '@core/environment';

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
