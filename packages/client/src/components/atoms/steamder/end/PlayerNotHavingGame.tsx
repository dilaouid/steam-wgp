import styled from "styled-components";

import { Col } from "react-bootstrap";
import { IPlayer } from "../../../../types/ISteamder";
import { Link } from "@tanstack/react-router";

const StyledImage = styled.img`
    width: 80px;
    border-radius: 17px;
    transition: all 0.5s;
    opacity: 1;
    &:hover {
        width: 85px;
        opacity: 0.8;
    }
`;

interface PlayerNotHavingGameProps {
    player: IPlayer;
}

export const PlayerNotHavingGame: React.FC<PlayerNotHavingGameProps> = ({ player }) => {
    return (
        <Col className="text-center">
            <Link to={ player.profileurl } target="_blank" className="text-decoration-none">
                <StyledImage src={`https://avatars.akamai.steamstatic.com/${player.avatar_hash}_full.jpg`} alt={`${player.username} profile picture`} />
            </Link>
            <p className="text-light">{player.username}</p>
        </Col>
    )
};