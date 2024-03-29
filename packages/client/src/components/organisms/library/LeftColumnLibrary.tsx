import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import { Question } from "../../atoms/library/Question";

const StyledCol = styled(Col)`
    height: 50%;
    background: #060606c5;
    padding: 22px;
    border-radius: 27px;
`;


const StyledRow = styled(Row)`
    font-family: Abel, sans-serif;
`;

const StyledTitle = styled.h3`
    font-family: Agdasima, sans-serif;
`;

export const LeftColumnLibrary: React.FC = () => {
    return(
        <StyledCol sm={12} lg={4} data-aos="fade-right" data-aos-duration="600">
            <StyledTitle className="text-info">🎮 Votre bibliothèque</StyledTitle>
            <p>Retrouvez votre bibliothèque de jeux multijoueurs <strong>Steam</strong> ici.</p>
            <Question>Vous ne retrouvez pas un de vos jeux ?</Question>
            <p>C'est que <strong>SteamWGP</strong> a considéré qu'il n'est pas un jeu multijoueur et qu'il n'a donc pas sa place ici !</p>
            <p>Ici, vous pouvez décidez des jeux que vous souhaitez rendre publiques ou privés dans les <strong className="text-info">Steamders</strong>. Si jamais vous voulez cacher un jeu que vous n'aimez vraiment pas ou que vous trouvez gênant, cette page est pour vous !</p>
            
            <Question>Comment faire ?</Question>
            <p>Tout simplement, en cliquant sur le jeu en question, et en validant votre opération ! Alors, facile ? 😉</p>
            <p>En rejoignant une <strong className="text-info">Steamder</strong>, vos jeux privés ne seront donc pas ajoutés à la liste des jeux en communs entre les différents joueurs du salon.</p>
            <hr />
            <StyledRow className="text-center" data-aos="zoom-out" data-aos-duration="450" data-aos-delay="300">
                {/* Show the modified private and public games, and the button to change the status of the games */}
            </StyledRow>
        </StyledCol>
    )
};