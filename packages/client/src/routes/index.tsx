import { useEffect } from 'react';

import { createFileRoute } from '@tanstack/react-router'
import { Homepage } from '../components/templates/Home_page';

import AOS from 'aos';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  const { t } = useTranslation('global/titles');
  document.title = t('homepage');

  useEffect(() => {
    AOS.init({
      once: true
    });
    AOS.refresh();
  }, []);
  return <Homepage />
}