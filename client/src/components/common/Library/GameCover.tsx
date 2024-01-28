import styled from "styled-components";

interface GameCoverProps {
    selected: boolean;
    hidden: boolean;
}
type StyledGameCoverProps = GameCoverProps & React.ImgHTMLAttributes<HTMLImageElement>;

const StyledGameCover = styled.img.attrs<StyledGameCoverProps>(props => ({
    ...props,
    style: {
        width: props.selected ? '155px' : 'auto',
        filter: props.hidden ? 'blur(1px) grayscale(100%)' : 'none',
        opacity: props.hidden ? '0.36' : '1',
        transition: 'all 0.2s ease-in-out',
    },
}))<StyledGameCoverProps>``;

interface GameCoverComponentProps {
    id: string;
    hidden: boolean;
    selected: boolean;
}

export default function GameCoverComponent({ id, hidden, selected }: GameCoverComponentProps) {
    return (
        <StyledGameCover
            src={`https://steamcdn-a.akamaihd.net/steam/apps/${id}/library_600x900.jpg`}
            selected={selected}
            hidden={hidden}
            alt={`Game cover for ${id}`}
        />
    );
}