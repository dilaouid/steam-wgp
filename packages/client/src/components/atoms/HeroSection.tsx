import styled from 'styled-components';

const Section = styled.div`
    max-width: 522px;
`;

const PinkText = styled.span`
    color: rgb(218, 48, 211);
`;

const PinkTextWhiteBackground = styled.span`
    color: rgb(231, 19, 210);
    background-color: rgb(255, 255, 255);
`;

export const HeroSection = () => {
    return (<Section>
        <h1 className="text-uppercase fw-bold" data-aos="fade-down" data-aos-duration="800" data-aos-delay="400">décidez à quoi <PinkTextWhiteBackground>jouer</PinkTextWhiteBackground> avec vos amis !</h1>
        <p className="my-3">Créez ou rejoignez un salon <strong>
            <PinkText>Steamder</PinkText></strong>, 
            et choisissez le jeu qui vous tient à cœur ! Avec la magie de <strong><PinkText>SteamWGP</PinkText></strong>, vous arriverez à vous mettre d'accord sur le choix du jeu beaucoup plus efficacement !
        </p>
        <a className="btn btn-info btn-lg me-2" role="button" href="login.html">Se connecter</a>
        <a className="btn btn-outline-info btn-lg" role="button" href="steamders.html">Liste des <strong>Steamders</strong></a>
    </Section>);
}
