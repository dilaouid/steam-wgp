import { useRef } from "react";
import styled from "styled-components";

const StyledImage = styled.img<{ $hovered?: boolean, $zoom?: boolean }>`
    transition: transform 0.3s;
    transform-style: preserve-3d;
    width: 317px;
    border-radius: 40px;
    box-shadow: 0px 0px 17px 10px #ff9b3f45;
    filter: ${props => props.$hovered ? 'grayscale(1)' : 'grayscale(0)'};
    transition: filter 0.3s ease-in-out;
    user-select: none;
`;

interface TiltableImageProps {
    src: string;
    hovered: boolean;
    alt: string;
    zoomAppears?: boolean;
}

export const TiltableImage: React.FC<TiltableImageProps> = ({ src, hovered, alt, zoomAppears, ...props }) => {
    const imgRef = useRef<HTMLImageElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const img = imgRef.current;
        if (!img) return;
    
        const { left, top, width, height } = img.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const centerX = width / 2;
        const centerY = height / 2;
        const rotateX = (centerY - y) / 20;
        const rotateY = (x - centerX) / 20;
    
        img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        const img = imgRef.current;
        if (img) img.style.transform = '';
    };

    return (
        <StyledImage ref={imgRef} alt={alt} src={src} $zoom={zoomAppears} $hovered={hovered} {...props} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
    );
};