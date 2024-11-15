import { useEffect } from 'react';
import AOS from 'aos';

import { createFileRoute, useParams } from '@tanstack/react-router'

import { useAuthStore } from '@store/authStore';
import { useSteamderStore } from '@store/steamderStore';
import useWebSocketStore from '@store/websocketStore';

import { SteamderWaitPage } from '@templates/SteamderWait_page';

import { getCookieValue } from '@utils/cookieUtils';

import { SteamderPlayPage } from '@templates/SteamderPlay_page';
import { SteamderWinPage } from '@templates/SteamderWin_page';

import { useGetSteamder } from '@hooks/useGetSteamder';
import { useJoinSteamder } from '@hooks/useJoinSteamder';
import { useTranslation } from 'react-i18next';
import { HelmetWrapper } from '@wrappers/HelmetWrapper';
import { Loader } from '@atoms/Loader';
import styled from 'styled-components';

import CoverImage from '@assets/images/steamderpage/cover.jpg';

export const Route = createFileRoute("/steamder/$steamderId")({
  component: Steamder
})

const StyledSection = styled.section`
    padding-top: 9px;
    padding-bottom: 27px;
    background-attachment: fixed;
    background-image: url(${CoverImage});
    background-size: cover;
    background-position: right;
    overflow-x: hidden;
    height: 60vh;
`;

function Steamder() {
  const { steamderId } = useParams({ from: '/steamder/$steamderId' });

  const { user, setUser, isAuthenticated } = useAuthStore();
  const { steamder, setSteamder } = useSteamderStore();
  const { connect } = useWebSocketStore.getState();
  const token = getCookieValue('token') as string;

  const joinMutation = useJoinSteamder(steamderId);
  const getSteamderMutation = useGetSteamder(steamderId);

  const { t } = useTranslation('global/titles');
  document.title = t('steamder');

  useEffect(() => {
    if (!isAuthenticated || !user) {
      localStorage.setItem('postLoginRedirect', '/steamder/' + steamderId);
      window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/steam`;
      return;
    }

    AOS.init();
    AOS.refresh();

    if (user.steamder) {
      getSteamderMutation.mutateAsync().then(steamder => {
        setSteamder({ ...steamder.data, swiped_games: [] });
        setUser({ ...user, steamder: steamder.data.id });
        connect(steamder.data.id, token);
      })
    } else {
      joinMutation.mutateAsync().then(steamder => {
        setSteamder({ ...steamder.data, swiped_games: [] });
        setUser({ ...user, steamder: steamder.data.id });
        connect(steamder.data.id, token);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ setSteamder ]);

  if (!steamder) return (
    <StyledSection>
      <Loader />
    </StyledSection>
  );

  return (<HelmetWrapper keyPrefix='steamder' noindex={true}>
      { !steamder && <Loader /> }
      { !steamder.started && <SteamderWaitPage /> }
      { steamder.complete && <SteamderWinPage /> }
      { (steamder.started && !steamder.complete) && <SteamderPlayPage /> }
    </HelmetWrapper>
  )
}