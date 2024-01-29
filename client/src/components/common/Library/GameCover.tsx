import styled from "styled-components";

interface GameCoverProps {
    isSelected: boolean;
    hidden: boolean;
}
type StyledGameCoverProps = GameCoverProps & React.ImgHTMLAttributes<HTMLImageElement>;

const StyledGameCover = styled.img.attrs<StyledGameCoverProps>(props => ({
    ...props,
    style: {
        width: props.isSelected ? '155px' : 'auto',
        filter: props.hidden ? 'blur(1px) grayscale(100%)' : 'none',
        opacity: props.hidden ? '0.36' : '1',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        margin: 6+'px',
        borderRadius: 10+'%',
    },
}))<StyledGameCoverProps>``;

interface GameCoverComponentProps {
    id: string;
    hidden: boolean;
    isSelected: boolean;
}

export default function GameCoverComponent({ id, hidden, isSelected }: GameCoverComponentProps) {
    return (
        <StyledGameCover
            src={`https://steamcdn-a.akamaihd.net/steam/apps/${id}/library_600x900.jpg`}
            isSelected={isSelected}
            hidden={hidden}
            alt={`Game cover for ${id}`}
        />
    );
}