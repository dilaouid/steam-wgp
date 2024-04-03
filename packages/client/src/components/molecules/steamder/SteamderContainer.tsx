import styled from "styled-components";
import { useSteamderStore } from "../../../store/steamderStore";
import { Container } from "react-bootstrap";

const StyledContainer = styled(Container)`
    background: #000000cc;
    margin-top: 21px;
`;

const StyledTitle = styled.h3`
    height: 76.5938px;
    padding-top: 8px;
    font-family: Abel, sans-serif;
    margin-bottom: -7px;
`;
export const SteamderContainer = () => {
    const { steamder } = useSteamderStore();
    if (!steamder) return null;

    return(
        <StyledContainer>
            <StyledTitle className="display-5 text-center text-warning">{steamder.name}</StyledTitle>
            <p className="font-monospace text-center">Vous êtes dans une <strong>Steamder</strong>, mais encore en salle d'attente ! Voici avec qui vous allez potentiellement jouer, on n'attends plus que l'administrateur du salon (le profil avec la petite couronne) démarre, et vous pourrez commencer à choisir !</p>
        </StyledContainer>
    );
};