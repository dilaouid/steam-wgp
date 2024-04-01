import styled from "styled-components";
import { Col } from "react-bootstrap";
import { BsDpad, BsInfoCircleFill } from "react-icons/bs";
import { CreateSteamderForm } from "../../molecules/steamders/CreateSteamderForm";

const StyledCol = styled(Col)`
    padding: 19px;
    background: #000000bb;
    border-radius: 47px;
    height: 50%;
`;

const StyledTitle = styled.h4`
    font-family: 'Archivo Narrow', sans-serif;
`;

const StyledText = styled.p`
    font-size: 18px;
    font-family: Abel, sans-serif;
`;

export const LeftColumnSteamders: React.FC = () => {
    return (
        <StyledCol sm={12} md={5} lg={4} data-aos="zoom-in" data-aos-duration="500">
            <StyledTitle className="text-info"><BsDpad /> | Créer une <strong>Steamder</strong></StyledTitle>

            <StyledText>
                <BsInfoCircleFill /> Une <strong>Steamder</strong>, c'est un salon où vous invitez d'autres joueurs (ou qu'ils rejoignent eux-mêmes).<br />
                Vos jeux multijoueurs sont mis en communs, et une fois la partie lancée, vous avez tout les jeux qui passent devant vous.
            </StyledText>

            <StyledText>
                A vous de liker ou pas les différents jeux qui passent devant vous. Le premier jeu liké par tout les joueurs ressortira pour tout le monde, et ainsi, vous avez pu décider du jeu auquel jouer. <strong>Ça clôture définitivement le débat !</strong>
            </StyledText>
            <hr />
            <CreateSteamderForm />
        </StyledCol>
    );
};