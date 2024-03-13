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

  return (
    <StyledNavItem eventKey={eventKey} href={to} className={flashy ? 'fw-bolder link-warning animate__animated animate__zoomIn' : ''}>
      { t(children.toString()) }
    </StyledNavItem>
  );
};

export default NavItem;