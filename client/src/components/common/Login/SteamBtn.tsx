
import styled from 'styled-components';
import {
    Link
} from 'react-router-dom';

const SteamBtn = styled.img`
    width: 250px;
    box-shadow: 0px 0px 20px 0px rgba(153,51,204,0.37);
    margin: auto;
    display: block;
    opacity: .6;
    transition: transform 1s ease, opacity 1s ease;

    &:hover {
        transform: scale(1.1);
        opacity: 1;
    }
`;

export default function SteamBtnComponent() {
    return (
        <Link to="http://localhost:8000/auth/steam">
            <SteamBtn className="img-fluid" data-bss-hover-animate="pulse" src="./assets/img/loginsteamlarge.png" alt="openid_steam" loading="lazy" />
        </Link>
    );
}