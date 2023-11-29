import styled from "styled-components";
import { useContext } from "react";
import SteamLoadingIcon from "../components/common/Home/Loading";
import HeadingTitleComponent from "../components/common/Login/HeadingTitle";
import { AuthContext } from "../context/AuthProvider";
import { HelloComponent } from "../components/common/Home/Hello";

const Legend = styled.p`
    margin-bottom: 42px;
`;

export default function LoadingPage () {
    const { auth } = useContext(AuthContext)!;
    return (
        <section className="py-4 py-xl-5">
            <div className="container">
                <div className="text-center p-4 p-lg-5">
                    <div id="sectionHeadingHomepage">
                        <HeadingTitleComponent />
                        <SteamLoadingIcon />
                        <HelloComponent username={ auth.user.username } />
                        <Legend className="text-light-emphasis">Nous préparons tout ce qu'il faut pour vous,<br />merci de patienter un instant, ça ne devrait pas être<br />long !&nbsp;</Legend>
                    </div>
                </div>
            </div>
        </section>
    );
}