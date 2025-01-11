import { useEffect } from 'react';

import { createFileRoute } from '@tanstack/react-router'
import { Homepage } from '@layouts/templates/Home_page';

import AOS from 'aos';
import { HelmetWrapper } from '@layouts/wrappers/HelmetWrapper';

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  useEffect(() => {
    AOS.init({
      once: true
    });
    AOS.refresh();
  }, []);
  return (
    <HelmetWrapper keyPrefix='homepage' noindex={false}>
      <Homepage />
    </HelmetWrapper>
  );
}