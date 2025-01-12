import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@store/authStore';
import { logout } from '@core/services/API/global/auth/logout';
import { deleteCookie } from '@core/utils/cookies';

import { BASE_URL } from '@core/environment';

import { LogoutIcon, SteamIconNavbar } from '@ui/atoms';

import { StyledAuthButton } from './AuthButton.styled';

interface AuthButtonProps {
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ className }) => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation('global/navbar');
  const { isAuthenticated, toggleAuth, setUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      deleteCookie('token');
      toggleAuth(false);
      setUser(null);
      await navigate({ to: '/' });
      localStorage.removeItem('animationPlayed');
    } catch (err) {
      console.error("Impossible de déconnecter l'utilisateur: " + err);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <StyledAuthButton
        variant="danger"
        onClick={handleLogout}
        className={className}
      >
        <LogoutIcon /> | {loading ? <Spinner size="sm" /> : t('logout')}
      </StyledAuthButton>
    );
  }

  return (
    <StyledAuthButton
      variant="info"
      href={`${BASE_URL}/auth/steam`}
      className={className}
    >
      <SteamIconNavbar /> | {t('login')}
    </StyledAuthButton>
  );
};