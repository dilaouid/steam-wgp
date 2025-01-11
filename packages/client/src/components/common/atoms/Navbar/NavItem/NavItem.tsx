import React from 'react';
import { useTranslation } from 'react-i18next';

import { StyledNavItem } from './NavItem.styled';

import 'animate.css';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  flashy?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, children, flashy }) => {
  const { t } = useTranslation();
  if (!children) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleTadaAnimation = (event: React.MouseEvent<any>) => {
    const targetClasslist = event.currentTarget.classList;
    if (!flashy) return;
    
    if (targetClasslist.contains('animate__zoomIn')) {
      targetClasslist.remove('animate__zoomIn');
    }

    if (targetClasslist.contains('animate__tada')) {
      targetClasslist.remove('animate__tada');
      void event.currentTarget.offsetWidth;
      targetClasslist.add('animate__tada');
    } else {
      targetClasslist.add('animate__tada');
    }
  }

  return (
    <li className='nav-item'>
      <StyledNavItem 
        to={to}
        className={flashy ? 'nav-link fw-bolder link-warning animate__animated animate__zoomIn' : 'nav-link'}
        activeProps={{ className: 'active' }}
        onMouseEnter={(event) => toggleTadaAnimation(event)}
      >
        { t(children.toString()) }
      </StyledNavItem>
    </li>
  );
};

export default NavItem;