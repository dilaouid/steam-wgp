import React from 'react';
import { Link } from '@tanstack/react-router';
import { NavImage, NavTitle } from './Brand.styled';
import NavbarLogo from '@assets/images/navbar/logo.png';

export const NavBrand: React.FC = () => (
  <Link to="/" className='text-decoration-none text-white'>
    <NavImage 
      src={NavbarLogo}
      alt="Logo SteamWGP"
      className="d-inline-block align-top animate__animated"
      width={37}
      onMouseEnter={(e) => e.currentTarget.classList.add('animate__rubberBand')}
      onMouseLeave={(e) => e.currentTarget.classList.remove('animate__rubberBand')}
    />
    <NavTitle>SteamWGP</NavTitle>
  </Link>
);