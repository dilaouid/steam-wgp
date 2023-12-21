import styled, { keyframes } from "styled-components";

const spinnerAnimation = keyframes`
  8.33% { x: 13px; y: 1px; }
  25% { x: 13px; y: 1px; }
  33.3% { x: 13px; y: 13px; }
  50% { x: 13px; y: 13px; }
  58.33% { x: 1px; y: 13px; }
  75% { x: 1px; y: 13px; }
  83.33% { x: 1px; y: 1px; }
`;

const AnimatedRectangle = styled.rect`
  animation: ${spinnerAnimation} 2.4s linear infinite;
`;

const FirstRectangle = styled(AnimatedRectangle)`
  animation-delay: -2.4s;
`;

const SecondRectangle = styled(AnimatedRectangle)`
  animation-delay: -1.6s;
`;

const ThirdRectangle = styled(AnimatedRectangle)`
  animation-delay: -0.8s;
`;

export const SpinnerIconComponent: React.FC = () => {
    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <FirstRectangle x="1" y="1" rx="1" width={10} height={10} fill="white" />
            <SecondRectangle x="1" y="1" rx="1" width={10} height={10} fill="white" />
            <ThirdRectangle x="1" y="1" rx="1" width={10} height={10} fill="white"  />
        </svg>
    );
};