import { useEffect } from 'react';

import { createLazyFileRoute } from '@tanstack/react-router'
import { ParallaxBackgroundHome } from '../components/organisms/homepage/ParallaxBackgroundHome'
import { FeaturesHome } from '../components/organisms/homepage/FeaturesHome';
import { StatsHome } from '../components/organisms/homepage/StatsHome';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const Route = createLazyFileRoute("/")({
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
      <FeaturesHome />
      <StatsHome />
    </>
  )
}