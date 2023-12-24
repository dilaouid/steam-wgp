import { useContext } from "react";
import styled from "styled-components"
import { Auth } from "../../../context";

const Heading = styled.div`
    cursor: default;
    user-select: none;
`;

const Title = styled.h4`
    margin-bottom: 37px;
`;

export default function HomePageHeadingComponent() {
    const { auth } = useContext(Auth.Context)!;

    return (
    <div className="text-center p-4 p-lg-5 animate__animated animate__fadeIn">
        <Heading>
            <p className="text-primary mb-2">
                <span>Bienvenue <strong>{ auth.user.username } </strong>!</span>
            </p>
            <Title className="text-center text-primary-emphasis">Organisez-vous et choisissez des jeux<br />avec vos amis !</Title>
        </Heading>
    </div>);
}