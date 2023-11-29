import { useEffect, useState } from "react";
import SteamLoadingIcon from "../components/common/Home/Loading";
import { checkAuth } from "../api/auth";
import LoginPage from "./Login";
import LoadingPage from "./LoadingPage";

export default function HomePage () {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const verifyUser = async () => {
          try {
            await checkAuth();
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Utilisateur non authentifié');
            setIsAuthenticated(false);
          }
          setIsLoading(false);
        };
        verifyUser();
    }, []);

    return (
        <section className="py-4 py-xl-5">
            { isLoading ? <SteamLoadingIcon /> : isAuthenticated ? <LoadingPage /> : <LoginPage /> }
        </section>
    );
}