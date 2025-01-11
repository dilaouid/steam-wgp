import styled from "styled-components";

export const StyledImage = styled.img<{ $golden?: boolean }>`
  width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  @keyframes rgb-neon-glow {
    0% { box-shadow: 0 0 10px #ff0000; }
    16% { box-shadow: 0 0 10px #ff7700; }
    33% { box-shadow: 0 0 10px #ffff00; }
    50% { box-shadow: 0 0 10px #00ff00; }
    66% { box-shadow: 0 0 10px #0000ff; }
    83% { box-shadow: 0 0 10px #8b00ff; }
    100% { box-shadow: 0 0 10px #ff0000; }
  };
  animation: ${props => props.$golden ? 'rgb-neon-glow 4s infinite linear' : ''};
  ${props => props.$golden ? 'filter: grayscale(0);' : 'filter: grayscale(.7);'}
  opacity: ${props => props.$golden ? 1 : .5};
  transition: 1s;
  &:hover {
    opacity: .8;
  }
`;