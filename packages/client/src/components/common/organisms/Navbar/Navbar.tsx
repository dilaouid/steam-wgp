import React from 'react';
import { Container, Navbar as RBNavbar } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import { useRouterState } from '@tanstack/react-router';

import { useAuthStore } from '@store/authStore';

import { NavComponent, NavItem } from '@ui/atoms';
import { AuthButton, Brand } from '@ui/molecules';

export const Navbar: React.FC = () => {
  const router = useRouterState();

  const { isAuthenticated, user } = useAuthStore();
  const { t } = useTranslation('global/navbar');

  return (
    router.location.pathname === '/login' ? <></> : <RBNavbar expand="md" variant="dark" bg="black" sticky="top" className="bg-opacity-75 py-3">
      <Container>

        <Brand />

        <RBNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <RBNavbar.Collapse id="responsive-navbar-nav">
          <NavComponent>
            <NavItem to="/">{t('homepage')}</NavItem>
            { isAuthenticated && <NavItem to="/library">{t('library')}</NavItem> }
            { isAuthenticated && user?.steamder && <NavItem to={`/steamder/${user.steamder}`}>{t('my_steamder')}</NavItem> }
            <NavItem to="/steamders">{t('steamders')}</NavItem>
            <NavItem to="https://ko-fi.com/dilaouid" flashy={true}>{t('donate')}</NavItem>
          </NavComponent>

          <AuthButton />
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};