import { useContext, useEffect } from 'react';
import { logOut } from "../api/auth";
import { useNavigate } from 'react-router-dom';
import { Auth } from '../context';

export default function LogoutPage() {
    const navigate = useNavigate();
    const { setAuth } = useContext(Auth.Context)!;
    useEffect(() => {
        const performLogout = async () => {
            try {
                await logOut();
                setAuth({ user: {
                    id: '',
                    username: '',
                    waitlist: null
                }, isAuthenticated: false });
                localStorage.removeItem('animationPlayed');
            } catch (err) {
                console.error("Impossible de déconnecter l'utilisateur: " + err);
            }
        };

        performLogout().then(() => {
            navigate('/steam-wgp/login');
        }).catch((err) => {
            console.error("Impossible de déconnecter l'utilisateur: " + err);
        });
    }, [ navigate, setAuth ]);

    return (
        <div className="container">
            
        </div>
    );
}