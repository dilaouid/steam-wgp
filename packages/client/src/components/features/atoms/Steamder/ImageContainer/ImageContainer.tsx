import { ImageContainerSteamder, IImageContainer } from ".";

export const ImageContainer: React.FC<IImageContainer> = ({ children }) => {
    return (
        <ImageContainerSteamder>
            { children }
        </ImageContainerSteamder>
    )
};