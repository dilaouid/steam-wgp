import styled from "styled-components";

const RedDiv = styled.div`
    border-radius: 40px;
    z-index: 3;
    position: absolute;
    height: 475.5px;
    background: #ff0000;
    width: 317px;
    opacity: .6;
`;

export const RedCover = () => {
    return (
        <RedDiv />
    )
}