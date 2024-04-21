import { useEffect } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router'

import { getSteamder } from '../../services/api/waitlists/get';
import { joinSteamder } from '../../services/api/waitlists/join';

import { useAuthStore } from '../../store/authStore';
import { useSteamderStore } from '../../store/steamderStore';

import { SteamderWaitPage } from '../../components/templates/SteamderWait_page';

import AOS from 'aos';
import useWebSocketStore from '../../store/websocketStore';
import { getCookieValue } from '../../utils/cookieUtils';
import { SteamderPlayPage } from '../../components/templates/SteamderPlay_page';


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
  loader: async ({ params: { steamderId } }) => {
    const token = getCookieValue('token') as string;
    const { setSteamder } = useSteamderStore.getState();
    const { connect } = useWebSocketStore.getState();
    const { setUser, user } = useAuthStore.getState();
  
    try {
      const steamder = await getSteamder(steamderId);
      setSteamder(steamder.data);
      connect(steamder.data.id, token);
      
      if (user) {
        setUser({
          ...user,
          waitlist: steamder.data.id
        });
      }
    } catch {
      const join = await joinSteamder(steamderId)
      setSteamder(join.data);
      connect(join.data.id, token);
      if (user) {
        setUser({ 
          ...user,
          waitlist: join.data.id
        });
      }
    }
  },
  
  onError: () => {
    if (getIsAuthenticated()) {
      throw redirect({
        to: '/'
      });
    }
  }
})

function Steamder() {
  const { steamder } = useSteamderStore();

  useEffect(() => {
    AOS.init({
        once: true,
        disableMutationObserver: true
    });
    AOS.refresh();
  }, []);
  if (!steamder)
    return null;

  if (!steamder.started)
    return <SteamderWaitPage />
  else
    return <SteamderPlayPage />
}