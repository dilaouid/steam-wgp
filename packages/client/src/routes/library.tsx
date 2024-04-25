import { useEffect } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { Librarypage } from '../components/templates/Library_page';

import AOS from 'aos';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute("/library")({
  component: Library,
  loader: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      localStorage.setItem('postLoginRedirect', '/library');
      window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/steam`;
      return;
    }
  }
})

function Library() {
  const { t } = useTranslation('global/titles');
  document.title = t('library');

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
      easing: 'ease-in-out',
      mirror: false,
      offset: 100
    });
    AOS.refresh();
  }, []);
  return <Librarypage />
}