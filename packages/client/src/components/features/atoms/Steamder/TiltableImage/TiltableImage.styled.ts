import styled from "styled-components";

export const StyledImage = styled.img<{ $hovered?: boolean, $zoom?: boolean }>`
    transition: transform 0.3s, filter 0.3s ease-in-out;
    transform-style: preserve-3d;
    width: 317px;
    height: 475.5px;
    border-radius: 40px;

    // if zoom, the box shadow glow and disappear in loop, otherwise, just glow
    box-shadow: '0px 0px 17px 10px #ff9b3f45';

    filter: ${props => props.$hovered ? 'grayscale(1)' : 'grayscale(0)'};

    user-select: none;

    @keyframes rgb-neon-glow {
        0% { box-shadow: 0 0 20px #ff0000; }
        16% { box-shadow: 0 0 20px #ff7700; }
        33% { box-shadow: 0 0 20px #ffff00; }
        50% { box-shadow: 0 0 20px #00ff00; }
        66% { box-shadow: 0 0 20px #0000ff; }
        83% { box-shadow: 0 0 20px #8b00ff; }
        100% { box-shadow: 0 0 20px #ff0000; }
    }

    // if zoom is true, make the image appears from hyper blur to normal (animation), if not, just show the image
    @keyframes appears {
        0% {
            filter: blur(255px);
        }
        100% {
            filter: blur(0);
        }
    }
    animation: ${props => props.$zoom ? 'rgb-neon-glow 4s infinite linear, appears 5s ease-in-out' : 'none'};
`;