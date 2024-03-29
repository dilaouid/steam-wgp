import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import HeadingTitleComponent from "../Login/HeadingTitle";
import { HelloComponent } from "./Hello";
import SteamLoadingIcon from "./Loading";
import { Auth } from "../../../context";
import { ProgressLabelComponent } from "./ProgressLabel";
import { IMessage } from "../../../types/API";

const Legend = styled.p`
    margin-bottom: 42px;
    text-align: center;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
`;

export default function ProgressLoadingComponent({ messages, animateFirstDiv }: { messages: IMessage[], animateFirstDiv: boolean }) {
    const { auth } = useContext(Auth.Context)!;
    const { t } = useTranslation(); 

    return (<div className="text-center p-4 p-lg-5">
        <div id="sectionHeadingHomepage" className={animateFirstDiv ? 'animate__animated animate__zoomOut animate__slower' : ''}>
            <HeadingTitleComponent />
            <SteamLoadingIcon />
            <HelloComponent username={ auth.user.username } />
            <Legend className="text-light-emphasis">{t('preparing_library')}</Legend>
            {messages.map((msg, index) => (
                <div key={index}>
                    <ProgressLabelComponent message={msg.message} type={msg.type} />
                </div>
            ))}
        </div>
    </div>);
}