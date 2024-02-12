const BASE_URL = import.meta.env.VITE_BASE_URL;

import { useContext, useEffect, useState } from "react";

import { IMessage } from "../types/API";

import ProgressLoadingComponent from "../components/common/Home/ProgressLoading";
import HomePageComponent from "../components/common/Home/HomePage";

import { Auth, Loading } from "../context";
import { getCookieValue } from "../utils/getCookie";
import { getBrowserLanguage } from "../utils/getLanguage";

export default function LoadingPage () {
    const [ messages, setMessages ] = useState<IMessage[]>([]);
    const [ showFirstDiv, setShowFirstDiv ] = useState(true);
    const [ animateFirstDiv, setAnimateFirstDiv ] = useState(false);
    const { setLoadingComplete, loadingComplete } = useContext(Loading.Context)!;
    const { auth } = useContext(Auth.Context)!;


    useEffect(() => {
        if (!auth.isAuthenticated)
            return;

        const animationPlayed = localStorage.getItem('animationPlayed') === 'true';
        if (animationPlayed) {
            setShowFirstDiv(false);
            setLoadingComplete(true);
            return;
        }

        const language = getBrowserLanguage();

        const eventSource = new EventSource(`${BASE_URL}/players/library-checker?token=${getCookieValue('token')}&lang=${language}`, {
            withCredentials: true,
        });
      
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.complete) {
                eventSource.close();
                setTimeout(() => {
                    setAnimateFirstDiv(true);
                }, 1000);
                setTimeout(() => {
                    setShowFirstDiv(false);
                    setLoadingComplete(true);
                    localStorage.setItem('animationPlayed', 'true');
                }, 2000);
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
    }, [auth, setLoadingComplete]);

    return (
        <section className="py-4 py-xl-5">
            <div className="container">
                { showFirstDiv && <ProgressLoadingComponent messages={messages} animateFirstDiv={animateFirstDiv} /> }
                { loadingComplete && (<HomePageComponent />) }
            </div>
        </section>
    );
}