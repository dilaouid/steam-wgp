import { Container } from "./ImageContainer.styled";

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