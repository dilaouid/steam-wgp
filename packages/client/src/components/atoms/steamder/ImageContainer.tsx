import styled from "styled-components";

const Container = styled.div`
    perspective: 1000px;
    display: inline-block;
    position: relative;
`;

interface IImageContainer {
    children: React.ReactNode;
}

export const ImageContainer: React.FC<IImageContainer> = ({ children }) => {
    return (
        <Container>
            { children }
        </Container>
    )
};