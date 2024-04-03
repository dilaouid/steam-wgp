import styled from "styled-components";
import { BsExclamationOctagon } from "react-icons/bs";

const NoMarginText = styled.p`
    margin-top: 0;
`;

interface MatchingGamesProps {
    player1: string;
    player2: string;
}

export const NotMatchingGames: React.FC<MatchingGamesProps> = ({ player1, player2 }) => {
    return (
        <NoMarginText className="text-danger">
            <BsExclamationOctagon /> <strong>{ player1 }</strong> and <strong>{ player2 }</strong> have no games in common
        </NoMarginText>
    );
};