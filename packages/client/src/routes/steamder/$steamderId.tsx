import { useEffect } from 'react';
import AOS from 'aos';

import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'

import { useAuthStore } from '../../store/authStore';
import { useSteamderStore } from '../../store/steamderStore';
import useWebSocketStore from '../../store/websocketStore';

import { SteamderWaitPage } from '../../components/templates/SteamderWait_page';

import { getCookieValue } from '../../utils/cookieUtils';
import { drawToast } from '../../utils/drawToast';

import { SteamderPlayPage } from '../../components/templates/SteamderPlay_page';
import { SteamderWinPage } from '../../components/templates/SteamderWin_page';

import { useGetSteamder } from '../../hooks/useGetSteamder';
import { useJoinSteamder } from '../../hooks/useJoinSteamder';

export const Route = createFileRoute("/steamder/$steamderId")({
  component: Steamder
})

function Steamder() {
  const { steamderId } = useParams({ from: '/steamder/$steamderId' });

  const { user, setUser, isAuthenticated } = useAuthStore();
  const { steamder, setSteamder } = useSteamderStore();
  const { connect } = useWebSocketStore.getState();
  const token = getCookieValue('token') as string;

  const joinMutation = useJoinSteamder(steamderId);
  const getSteamderMutation = useGetSteamder(steamderId);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate({
        to: '/'
      });
      return;
    }

    AOS.init();
    AOS.refresh();

    getSteamderMutation.mutateAsync().then(steamder => {
      setSteamder({ ...steamder.data, swiped_games: [] });
      setUser({ ...user, waitlist: steamder.data.id });
      connect(steamder.data.id, token);
    }).catch(() => {
      joinMutation.mutateAsync().then(steamder => {
        setSteamder({ ...steamder.data, swiped_games: [] });
        setUser({ ...user, waitlist: steamder.data.id });
        connect(steamder.data.id, token);
      }).catch(() => {
        drawToast('cannot_join_steamder', 'error');
        navigate({
          to: '/steamders'
        });
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ setSteamder, setUser ]);

  if (!steamder) 
    return <></>

  if (!steamder.started)
    return <SteamderWaitPage />
  else if (steamder.complete)
    return <SteamderWinPage />
  else
    return <SteamderPlayPage />
}