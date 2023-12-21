import { useEffect } from 'react';
import { logOut } from "../api/auth";

export default function LogoutPage() {
    useEffect(() => {
        const performLogout = async () => {
            try {
                await logOut();
                window.location.href = "/";
            } catch (err) {
                console.error("Impossible de déconnecter l'utilisateur: " + err);
            }
        };

        performLogout();
    }, []);

    return (
        <div className="container">
            
        </div>
    );
}