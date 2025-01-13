import styled, { keyframes } from "styled-components";

import { FaTrophy } from "react-icons/fa";

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const StyledTrophy = styled(FaTrophy)`
  position: absolute;
  top: -25px;
  font-size: 40px;
  z-index: 2;
  color: ${props => props.color || 'gold'};
  animation: ${pulseAnimation} 2s infinite;
`;