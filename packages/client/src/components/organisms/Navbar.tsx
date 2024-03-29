import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';

import { useAuthStore } from '../../store/authStore';

import { Container, Navbar as RBNavbar, Nav, Button } from 'react-bootstrap';
import NavItem from '../atoms/NavItem';
import { FaPowerOff, FaSteam } from "react-icons/fa";

import NavbarLogo from '../../assets/images/navbar/logo.png';
import { logout } from '../../services/api/global/auth/logoutApi';

const StyledNav = styled(Nav)`
    font-family: 'Abel', sans-serif;
`;

const StyledNavImg = styled.img`
    width: 37px;
    user-select: none;
    margin-right: 10px;
`;

const StyledNavTitle = styled.span`
    font-family: 'Archivo Narrow', sans-serif;
    user-select: none;
`;

const LogoutIcon = styled(FaPowerOff)`
    margin-right: 10px;
`;
const SteamIcon = styled(FaSteam)`
    margin-right: 10px;
`;

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Navbar: React.FC = () => {
  const { isAuthenticated, toggleAuth, setUser, user } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation('global/navbar');

    const handleAuthClick = () => {
      logout().then(() => {
        toggleAuth(false);
        setUser(null);
        navigate({to: '/'}).then(() => {
          localStorage.removeItem('animationPlayed');
        })
      }).catch((err) => {
        console.error("Impossible de déconnecter l'utilisateur: " + err);
      });
    }

  return (
    <RBNavbar expand="md" variant="dark" bg="black" sticky="top" className="bg-opacity-75 py-3">
      <Container>

        <RBNavbar.Brand href="/">
          <StyledNavImg 
            src={NavbarLogo}
            alt="Logo SteamWGP"
            className="d-inline-block align-top animate__animated"
            width={37}
            onMouseEnter={(e) => e.currentTarget.classList.add('animate__rubberBand')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('animate__rubberBand')}
          />
          <StyledNavTitle>SteamWGP</StyledNavTitle>
        </RBNavbar.Brand>

        <RBNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <RBNavbar.Collapse id="responsive-navbar-nav">
          <StyledNav className="ms-auto">
            <NavItem eventKey="1" to="/">{t('homepage')}</NavItem>
            { isAuthenticated && <NavItem eventKey="2" to="/library">{t('library')}</NavItem> }
            { isAuthenticated && user?.steamderId && <NavItem eventKey="3" to={`/steamder/${user.steamderId}`}>{t('my_steamder')}</NavItem> }
            <NavItem eventKey="4" to="/steamders">{t('steamders')}</NavItem>
            <NavItem eventKey="5" to="/steamders" flashy={true}>{t('donate')}</NavItem>
          </StyledNav>
          { isAuthenticated && <Button style={{fontFamily: 'Abel'}} variant="danger" onClick={handleAuthClick} href="/"><LogoutIcon /> | { t('logout') } </Button> }
          { !isAuthenticated && <Button style={{fontFamily: 'Abel'}} variant="info" href={ BASE_URL + "/auth/steam" }><SteamIcon /> | {t('login')}</Button> }
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;