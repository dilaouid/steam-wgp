import styled from "styled-components";

export const StyledLikedGames = styled.img`
    object-fit: cover;
    width: 60px;
    height: 60px;
    margin: 9px;
    opacity: 0.60;
    filter: grayscale(100%);
    transition: .3s;
    cursor: pointer;
  
    &:hover {
        opacity: .3;
        transform: scale(.9);
    }
`;