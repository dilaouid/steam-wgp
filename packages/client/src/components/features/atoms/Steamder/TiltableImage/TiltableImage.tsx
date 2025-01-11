import { useEffect, useRef, useState } from "react";
import { StyledImage, TiltableImageProps } from "."

export const TiltableImage: React.FC<TiltableImageProps> = ({ gameId, hovered, alt, zoomAppears, ...props }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [ imageUrl, setImageUrl ] = useState(`https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/library_600x900.jpg`);

    useEffect(() => {
        setImageUrl(`https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/library_600x900.jpg`);
    }, [gameId]);
    
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

    const handleImageError = () => {
        setImageUrl(`https://cdn.akamai.steamstatic.com/steam/apps/${gameId}/header.jpg`);
    };

    return (
        <StyledImage ref={imgRef} alt={alt} src={imageUrl} $zoom={zoomAppears} $hovered={hovered} {...props} onError={handleImageError} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
    );
};