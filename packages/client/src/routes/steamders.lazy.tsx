import { createLazyFileRoute } from '@tanstack/react-router'
import { SteamdersPage } from '@layouts/templates/Steamders_page';

import AOS from 'aos';
import { HelmetWrapper } from '@layouts/wrappers/HelmetWrapper';

export const Route = createLazyFileRoute("/steamders")({
  component: Steamders
})

function Steamders() {
  AOS.init({
      once: true,
      disableMutationObserver: true
  });
  AOS.refresh();

  return (
  <HelmetWrapper keyPrefix='steamders' noindex={false}>
    <SteamdersPage />
  </HelmetWrapper>)
}