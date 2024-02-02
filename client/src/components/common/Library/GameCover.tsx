import styled from "styled-components";

interface GameCoverProps {
    isSelected: boolean;
    hide: boolean;
}
type StyledGameCoverProps = GameCoverProps & React.ImgHTMLAttributes<HTMLImageElement>;

const StyledGameCover = styled.img.attrs<StyledGameCoverProps>(props => ({
    ...props,
    style: {
        width: props.isSelected ? '155px' : '204px',
        filter: props.hide ? 'blur(1px) grayscale(100%)' : 'none',
        opacity: props.hide ? '0.36' : '1'
    },
}))<StyledGameCoverProps>`
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    margin: 6px;
    border-radius: 10%;

    &:hover {
        opacity: 0.5 !important;
        transform: scale(0.9);

    }
`;

interface GameCoverComponentProps {
    id: string;
    hide: boolean;
    isSelected: boolean;
}

export default function GameCoverComponent({ id, hide, isSelected }: GameCoverComponentProps) {
    return (
        <StyledGameCover
            src={`https://steamcdn-a.akamaihd.net/steam/apps/${id}/library_600x900.jpg`}
            isSelected={isSelected}
            hide={hide}
            alt={`Game cover for ${id}`}
        />
    );
}