import { useEffect } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { Librarypage } from '../components/templates/Library_page';

import AOS from 'aos';
import { useAuthStore } from '../store/authStore';
import { HelmetWrapper } from '../components/wrappers/HelmetWrapper';

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
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <HelmetWrapper keyPrefix={'library'} noindex={true}>
      <Librarypage />
    </HelmetWrapper>
  )
}