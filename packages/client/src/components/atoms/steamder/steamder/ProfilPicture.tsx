import styled from "styled-components";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import { IPlayer } from "../../../../types/ISteamder";

const StyledImage = styled(Image)<{ $isOtherPlayer: boolean, $disabled: boolean }>`
    width: 120px;
    box-shadow: 0px 0px 19px 0px var(--bs-warning);
    border-radius: 23px;
    user-select: none;
    transition: all 0.5s;
    &:hover {
        box-shadow: 0px 0px 19px 0px var(--bs-yellow);
        width: 115px;
    }
    ${props => props.$isOtherPlayer ? `margin-top: 52px;` : ''}
    ${props => props.$disabled ? `filter: grayscale(100%); opacity: 0.40;` : ``}
`;

const LabelTooltip = (message: string) => 
    <Tooltip id="switch-tooltip">
        { message }
    </Tooltip>;

interface ProfilPictureProps {
    disable: boolean;
    isOtherPlayer: boolean
    player: IPlayer;
}

export const ProfilPicture: React.FC<ProfilPictureProps> = ({ disable, isOtherPlayer, player }) => {
    return(
        <Link to={player.profileurl} target="_blank">
            <OverlayTrigger placement="top" overlay={LabelTooltip(player.username)} trigger={['hover', 'focus']}>
                <StyledImage src={`https://avatars.akamai.steamstatic.com/${player.avatar_hash}_full.jpg`} loading="lazy" fluid $isOtherPlayer={isOtherPlayer} $disabled={disable} />
            </OverlayTrigger>
        </Link>
    )
};