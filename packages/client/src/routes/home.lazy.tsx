import { useEffect } from 'react';

import { createLazyFileRoute } from '@tanstack/react-router'
import { ParallaxBackgroundHome } from '../components/molecules/ParallaxBackgroundHome'

import AOS from 'aos';
import 'aos/dist/aos.css';

export const Route = createLazyFileRoute("/home")({
  component: Home,
})

function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <ParallaxBackgroundHome />
    </>
  )
}