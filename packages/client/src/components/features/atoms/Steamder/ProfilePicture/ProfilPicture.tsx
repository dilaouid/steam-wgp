import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import { IPlayer } from "../../../../../core/types/ISteamder";
import { StyledImage } from "./ProfilePicture.styled";

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