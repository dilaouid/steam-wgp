import { useEffect } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router'

import { getSteamder } from '../../services/api/waitlists/get';

import { Steamderpage } from '../../components/templates/Steamder_page';
import { Loader } from '../../components/atoms/Loader';

import AOS from 'aos';

export const Route = createFileRoute("/steamder/$steamderId")({
  component: Steamder,
  loader: ({ params: { steamderId } }) => getSteamder(steamderId),
  beforeLoad: () => <Loader />,
  onError: () => {
    throw redirect({
      to: '/'
    });
  }
})

function Steamder() {
  useEffect(() => {
    AOS.init({
        once: true,
        disableMutationObserver: true
    });
    AOS.refresh();
  }, []);
  return <Steamderpage />
}