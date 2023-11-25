import styled, { keyframes } from 'styled-components';

const animateGradient = keyframes`
  0%, 100% {
    background-image: linear-gradient(45deg, #391ee4, #af4261);
  }
  50% {
    background-image: linear-gradient(45deg, #4723d5, #c15372);
  }
`;

const HeadingTitle = styled.h1`
    background-image: linear-gradient(45deg, #391ee4, #af4261);
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    margin-bottom: 0px;
    animation: ${animateGradient} 8s ease-in-out infinite;
`;

export default function HeadingTitleComponent() {
    return (
        <HeadingTitle className='fw-bold'>
            SteamWGP
        </HeadingTitle>
    );
}