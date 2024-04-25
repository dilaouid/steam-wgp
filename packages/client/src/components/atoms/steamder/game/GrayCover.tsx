import styled from "styled-components";

const GrayDiv = styled.div`
    border-radius: 40px;
    z-index: 3;
    position: absolute;
    height: 475.5px;
    background: #393939;
    width: 317px;
    opacity: .6;
`;

export const GrayCover = () => {
    return (
        <GrayDiv />
    )
}