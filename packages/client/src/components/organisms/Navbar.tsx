import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from '@tanstack/react-router';

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
    margin-right: 10px;
`;

const StyledNavTitle = styled.span`
    font-family: 'Archivo Narrow', sans-serif;
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

        <RBNavbar.Brand className='user-select-none'>
          <Link to="/" className='text-decoration-none text-white'>
            <StyledNavImg 
              src={NavbarLogo}
              alt="Logo SteamWGP"
              className="d-inline-block align-top animate__animated"
              width={37}
              onMouseEnter={(e) => e.currentTarget.classList.add('animate__rubberBand')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('animate__rubberBand')}
            />
            <StyledNavTitle>SteamWGP</StyledNavTitle>
          </Link>
        </RBNavbar.Brand>

        <RBNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <RBNavbar.Collapse id="responsive-navbar-nav">
          <StyledNav className="ms-auto">
            <NavItem to="/">{t('homepage')}</NavItem>
            { isAuthenticated && <NavItem to="/library">{t('library')}</NavItem> }
            { isAuthenticated && user?.waitlist && <NavItem to={`/steamder/${user.waitlist}`}>{t('my_steamder')}</NavItem> }
            <NavItem to="/steamders">{t('steamders')}</NavItem>
            <NavItem to="/steamders" flashy={true}>{t('donate')}</NavItem>
          </StyledNav>
          { isAuthenticated && <Button style={{fontFamily: 'Abel'}} variant="danger" onClick={handleAuthClick}><LogoutIcon /> | { t('logout') } </Button> }
          { !isAuthenticated && <Button style={{fontFamily: 'Abel'}} variant="info" href={ BASE_URL + "/auth/steam" }><SteamIcon /> | {t('login')}</Button> }
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;