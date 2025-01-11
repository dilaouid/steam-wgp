import { Col } from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import { StyledImage, PlayerNotHavingGameProps } from ".";

export const PlayerNotHavingGame: React.FC<PlayerNotHavingGameProps> = ({ player }) => {
    return (
        <Col className="text-center align-content-center" sm={'auto'}>
            <Link to={ player.profileurl } target="_blank" className="text-decoration-none">
                <StyledImage src={`https://avatars.akamai.steamstatic.com/${player.avatar_hash}_full.jpg`} alt={`${player.username} profile picture`} />
            </Link>
        </Col>
    )
};