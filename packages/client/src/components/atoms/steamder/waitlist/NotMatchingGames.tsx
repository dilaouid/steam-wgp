import styled from "styled-components";
import { BsExclamationOctagon } from "react-icons/bs";
import { Trans, useTranslation } from "react-i18next";

const NoMarginText = styled.p`
    margin-top: 0px;
`;

interface MatchingGamesProps {
    player1: string;
    player2: string;
}

export const NotMatchingGames: React.FC<MatchingGamesProps> = ({ player1, player2 }) => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "waitlist.errors" });
    return (
        <NoMarginText className="text-danger">
            <BsExclamationOctagon /> <Trans t={t} i18nKey="not_matching" values={{ player1, player2 }} components={{ 1: <strong /> }} />
        </NoMarginText>
    );
};