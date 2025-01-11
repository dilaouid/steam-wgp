import React from 'react';
import { StyledNav } from './NavComponent.styled';

interface NavProps {
  children: React.ReactNode;
  className?: string;
}

export const NavComponent: React.FC<NavProps> = ({ children, className }) => (
  <StyledNav className={`ms-auto ${className || ''}`}>
    <ul className="navbar-nav mr-auto">
      {children}
    </ul>
  </StyledNav>
);