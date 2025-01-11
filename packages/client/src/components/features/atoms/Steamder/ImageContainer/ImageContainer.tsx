import { Container, IImageContainer } from ".";

export const ImageContainer: React.FC<IImageContainer> = ({ children }) => {
    return (
        <Container>
            { children }
        </Container>
    )
};