import { useEffect } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router'

import { getSteamder } from '../../services/api/waitlists/get';
import { useAuthStore } from '../../store/authStore';
import { useSteamderStore } from '../../store/steamderStore';

import { Steamderpage } from '../../components/templates/Steamder_page';

import AOS from 'aos';


const getIsAuthenticated = () => {
  return useAuthStore.getState().isAuthenticated;
}

export const Route = createFileRoute("/steamder/$steamderId")({
  component: Steamder,
  beforeLoad: ({ params: { steamderId } }) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      localStorage.setItem('postLoginRedirect', '/steamder/' + steamderId);
      window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/steam`;
      return;
    }

  },
  loader: ({ params: { steamderId } }) => {
    const { setSteamder } = useSteamderStore.getState();

    getSteamder(steamderId).then((steamder) => {
      setSteamder(steamder.data);
    })
  },
  onError: () => {
    if (getIsAuthenticated()) {
      throw redirect({
        to: '/'
      });
    }
  },
  staleTime: 1000 * 60 * 5
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