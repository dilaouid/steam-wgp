import { useContext, useEffect, useState } from "react";
import SteamLoadingIcon from "../components/common/Home/Loading";
import { checkAuth } from "../api/auth";
import LoginPage from "./Login";
import LoadingPage from "./LoadingPage";
import { AuthContext } from "../context/AuthProvider";
import { LoadingContext } from "../context/LoadingProvider";
import FooterComponent from "../components/common/Footer/Footer";

export default function HomePage () {
    const { setAuth } = useContext(AuthContext)!;
    const { loadingComplete } = useContext(LoadingContext)!;

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const verifyUser = async () => {
          try {
            const userData = await checkAuth();
            setAuth({ isAuthenticated: true, user: userData });
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Utilisateur non authentifié');
            localStorage.removeItem('animationPlayed');
            setAuth({ isAuthenticated: false, user: { id: '', username: '', waitlist: null } });
            setIsAuthenticated(false);
          }
          setIsLoading(false);
        };
        verifyUser();
    }, [setAuth]);

    return (
      <div>
        <section className="py-4 py-xl-5">
            { isLoading ? <SteamLoadingIcon /> : isAuthenticated ? <LoadingPage /> : <LoginPage /> }
        </section>
        { !isLoading && loadingComplete ? <FooterComponent /> : '' }
      </div>
    );
}