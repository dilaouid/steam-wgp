import { useEffect } from 'react';
import { logOut } from "../api/auth";
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const performLogout = async () => {
            try {
                await logOut();
                navigate('/');
            } catch (err) {
                console.error("Impossible de déconnecter l'utilisateur: " + err);
            }
        };

        performLogout();
    }, [ navigate ]);

    return (
        <div className="container">
            
        </div>
    );
}