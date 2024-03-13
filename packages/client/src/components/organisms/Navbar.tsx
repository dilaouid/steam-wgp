import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { useAuthStore } from '../../store/authStore';

import { Container, Navbar as RBNavbar, Nav, Button } from 'react-bootstrap';
import NavItem from '../atoms/NavItem';
import NavbarLogo from '../../assets/images/navbar/logo.png';
import { SteamIconLogin } from '../atoms/SteamIconLogin';

import 'animate.css';

const StyledNav = styled(Nav)`
    font-family: 'Abel', sans-serif;
`;

const StyledNavImg = styled.img`
    width: 37px;
`;

const StyledNavTitle = styled.span`
    font-family: 'Archivo Narrow', sans-serif;
`;

const Navbar: React.FC = () => {
  const { isAuthenticated, toggleAuth } = useAuthStore();
  const { t } = useTranslation();

    const handleAuthClick = () => {
        toggleAuth(!isAuthenticated);
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
          /> {' '}
          <StyledNavTitle>SteamWGP</StyledNavTitle>
        </RBNavbar.Brand>

        <RBNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <RBNavbar.Collapse id="responsive-navbar-nav">
          <StyledNav className="ms-auto">
            <NavItem eventKey="1" to="/">{t('navbar__homepage')}</NavItem>
            { isAuthenticated && <NavItem eventKey="2" to="/library">{t('navbar__library')}</NavItem> }
            { isAuthenticated && <NavItem eventKey="3" to="/steamder/:id">{t('navbar__my_steamder')}</NavItem> }
            { isAuthenticated && <NavItem eventKey="4" to="/steamders">{t('navbar__steamders')}</NavItem> }
            <NavItem eventKey="5" to="/steamders" flashy={true}>{t('navbar__donate')}</NavItem>
          </StyledNav>
          { isAuthenticated && <Button style={{fontFamily: 'Abel'}} variant="danger" onClick={handleAuthClick} href="/"> { t('navbar__logout') } </Button> }
          { !isAuthenticated && <Button style={{fontFamily: 'Abel'}} variant="info" href="/login"><SteamIconLogin /> | {t('navbar__login')}</Button> }
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;