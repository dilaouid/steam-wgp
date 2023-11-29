import { useContext, useEffect, useState } from "react";
import SteamLoadingIcon from "../components/common/Home/Loading";
import { checkAuth } from "../api/auth";
import LoginPage from "./Login";
import LoadingPage from "./LoadingPage";
import { AuthContext } from "../context/AuthProvider";

export default function HomePage () {
    const { setAuth } = useContext(AuthContext)!;

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const verifyUser = async () => {
          try {
            const userData = await checkAuth();
            setAuth({ isAuthenticated: true, user: userData });
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Utilisateur non authentifié');
            setAuth({ isAuthenticated: false, user: { id: '', username: '' } });
            setIsAuthenticated(false);
          }
          setIsLoading(false);
        };
        verifyUser();
    }, [setAuth]);

    return (
        <section className="py-4 py-xl-5">
            { isLoading ? <SteamLoadingIcon /> : isAuthenticated ? <LoadingPage /> : <LoginPage /> }
        </section>
    );
}