import { useEffect } from 'react';

import { createLazyFileRoute } from '@tanstack/react-router';
import { Librarypage } from '../components/templates/Library_page';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const Route = createLazyFileRoute("/library")({
  component: Home,
})

function Home() {
  useEffect(() => {
    AOS.init({
      once: true
    });
    AOS.refresh();
  }, []);
  return <Librarypage />
}