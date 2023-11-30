import styled from "styled-components";
const BASE_URL = import.meta.env.VITE_BASE_URL;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

import { IMessage } from "../api/players";

import SteamLoadingIcon from "../components/common/Home/Loading";
import HeadingTitleComponent from "../components/common/Login/HeadingTitle";
import { HelloComponent } from "../components/common/Home/Hello";
import { ProgressLabelComponent } from "../components/common/Home/ProgressLabel";

const Legend = styled.p`
    margin-bottom: 42px;
`;

export default function LoadingPage () {
    const { auth } = useContext(AuthContext)!;
    const [ messages, setMessages ] = useState<IMessage[]>([]);

    useEffect(() => {
        const eventSource = new EventSource(`${BASE_URL}/players/library-checker`, {
            withCredentials: true
        });
      
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.complete) {
                eventSource.close();
            }
            setMessages((messages) => [...messages, data]);
        };
      
        eventSource.onerror = (error) => {
          console.error('SSE error:', error);
          eventSource.close();
    
        };
      
        return () => {
          eventSource.close();
        };
    }, []);

    return (
        <section className="py-4 py-xl-5">
            <div className="container">
                <div className="text-center p-4 p-lg-5">
                    <div id="sectionHeadingHomepage">
                        <HeadingTitleComponent />
                        <SteamLoadingIcon />
                        <HelloComponent username={ auth.user.username } />
                        <Legend className="text-light-emphasis">Nous préparons tout ce qu'il faut pour vous,<br />merci de patienter un instant, ça ne devrait pas être<br />long !&nbsp;</Legend>
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <ProgressLabelComponent message={msg.message} type={msg.type} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}