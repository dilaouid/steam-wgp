import { useEffect } from 'react';

import { createFileRoute } from '@tanstack/react-router';

import { Librarypage } from '@layouts/templates/Library_page';
import { HelmetWrapper } from '@layouts/wrappers/HelmetWrapper';

import AOS from 'aos';
import { useAuthStore } from '@store/authStore';

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