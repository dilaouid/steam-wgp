import React from 'react';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import 'animate.css';

interface NavItemProps {
  eventKey: string;
  to: string;
  children: React.ReactNode;
  flashy?: boolean;
}

const StyledNavItem = styled(Nav.Link)`
  margin-right: 30px;
`;

const NavItem: React.FC<NavItemProps> = ({ eventKey, to, children, flashy }) => {
  const { t } = useTranslation();
  if (!children) {
    return null;
  }

  const toggleTadaAnimation = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
    <StyledNavItem 
      eventKey={eventKey}
      href={to}
      onMouseEnter={(event) => { toggleTadaAnimation(event) }}
      className={flashy ? 'fw-bolder link-warning animate__animated animate__zoomIn' : ''}
    >
      { t(children.toString()) }
    </StyledNavItem>
  );
};

export default NavItem;