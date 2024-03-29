import { useEffect } from 'react';

import { createLazyFileRoute } from '@tanstack/react-router';
import { Librarypage } from '../components/templates/Librarypage';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const Route = createLazyFileRoute("/library")({
  component: Home,
})

function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return <Librarypage />
}