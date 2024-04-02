import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import { SteamdersPage } from '../components/templates/Steamders_page';

import AOS from 'aos';

export const Route = createLazyFileRoute("/steamders")({
  component: Steamders
})

function Steamders() {
  useEffect(() => {
    AOS.init({
        once: true,
        disableMutationObserver: true
    });
    AOS.refresh();
  }, []);
  return <SteamdersPage />
}