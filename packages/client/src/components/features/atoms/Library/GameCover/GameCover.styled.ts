import styled from "styled-components";
import Skeleton from 'react-loading-skeleton';

export const Cover = styled.img<{ $private: boolean, $isFallback: boolean }>`
    user-select: none;
    transition: .4s;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    position: relative;
    z-index: 1;
    filter: ${props => props.$private ? 'blur(0px) brightness(79%) contrast(113%) grayscale(100%)' : 'none'};
    opacity: ${props => props.$private ? '0.6' : '1'};
    object-fit: ${props => props.$isFallback ? 'cover' : 'contain'};
    object-position: ${props => props.$isFallback ? 'center' : 'top'};
    &:hover {
        opacity: .6;
        transform: scale(0.9);
    }
`;

export const GoodSizedSkeleton = styled(Skeleton)`
    z-index: 1;
    line-height: 1.5;
`;