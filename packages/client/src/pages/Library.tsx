import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Auth, Library, Loading } from "../context";
import { getLibrary } from "../api/library";
import SteamLoadingIcon from "../components/common/Home/Loading";
import { checkAuth } from "../api/auth";
import { useNavigate } from "react-router-dom";
import LibraryContainerComponent from "../components/common/Library/LibraryContainer";
import FooterComponent from "../components/common/Footer/Footer";
import OverlayInformationsComponent from "../components/common/Library/OverlayInformations";

const LibraryDiv = styled.div`
    --animate-duration: 0.5s;
    overflow-y: scroll;
    height: 105vh;
    padding-bottom: 100px;
`;

export default function LibraryPage () {
    const { library, setLibrary } = useContext(Library.Context)!;
    const { auth, setAuth } = useContext(Auth.Context)!;
    const { setLoadingComplete } = useContext(Loading.Context)!;

    const [ isLoading, setIsLoading ] = useState(true);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (!auth.isAuthenticated) {
            const verifyUser = async () => {
                try {
                    const userData = await checkAuth();
                    setAuth({ isAuthenticated: true, user: userData });
                    setLoadingComplete(true);
                } catch (error) {
                    console.error('Utilisateur non authentifié');
                    navigate('/steam-wgp/');
                }
            };
            verifyUser();
        }
    }, [ auth.isAuthenticated, setLoadingComplete, setAuth, navigate ]);

    useEffect(() => {
        if (library && library.games?.length > 0) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const fetchLibrary = async () => {
            try {
                const libraryData = await getLibrary();
                
                setLibrary({games: libraryData.data, selected: []});
            } catch (error) {
                console.error('Impossible de récupérer la bibliothèque');
            }
            setIsLoading(false);
        };
        fetchLibrary();
    }, [library, setLibrary]);

    return (
        <LibraryDiv>
            <OverlayInformationsComponent />
            <section className="py-4 py-xl-5">
                { isLoading ? <SteamLoadingIcon /> : <LibraryContainerComponent /> }
            </section>
            <FooterComponent />
        </LibraryDiv>
    );
}