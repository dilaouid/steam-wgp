const BASE_URL = import.meta.env.VITE_BASE_URL;

import { useEffect, useState } from "react";

import { IMessage } from "../api/players";

import ProgressLoadingComponent from "../components/common/Home/ProgressLoading";

export default function LoadingPage () {
    const [ messages, setMessages ] = useState<IMessage[]>([]);
    const [ showFirstDiv, setShowFirstDiv ] = useState(true);
    const [ animateFirstDiv, setAnimateFirstDiv ] = useState(false);
    const [ showSecondDiv, setShowSecondDiv ] = useState(false);


    useEffect(() => {
        const eventSource = new EventSource(`${BASE_URL}/players/library-checker`, {
            withCredentials: true
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
                    setShowSecondDiv(true);
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
    }, []);

    return (
        <section className="py-4 py-xl-5">
            <div className="container">
                {showFirstDiv && <ProgressLoadingComponent messages={messages} animateFirstDiv={animateFirstDiv} />}
                {showSecondDiv && (
                    <div className='animate__animated animate__fadeIn'>
                        <h1 className="text-center text-light-emphasis">C'est bon, vous pouvez y aller !</h1>
                    </div>
                )}
            </div>
        </section>
    );
}