import React from 'react';
import { StyledNav } from './NavComponent.styled';

interface NavProps {
  children: React.ReactNode;
}

export const NavComponent: React.FC<NavProps> = ({ children }) => (
  <StyledNav className="ms-auto">
    <ul className="navbar-nav mr-auto">
      {children}
    </ul>
  </StyledNav>
);