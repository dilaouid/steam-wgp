import { useEffect } from 'react';

import { createFileRoute } from '@tanstack/react-router'
import { Homepage } from '../components/templates/Homepage';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return <Homepage />
}