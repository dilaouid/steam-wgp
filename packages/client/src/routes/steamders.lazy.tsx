import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import { SteamdersPage } from '../components/templates/Steamders_page';

import AOS from 'aos';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute("/steamders")({
  component: Steamders
})

function Steamders() {
  const { t } = useTranslation('global/titles');
  document.title = t('steamders');

  useEffect(() => {
    AOS.init({
        once: true,
        disableMutationObserver: true
    });
    AOS.refresh();
  }, []);
  return <SteamdersPage />
}