import { logOut } from "../api/auth";

export default async function LogoutPage() {
    try {
        await logOut();
        window.location.href = "/";
    } catch (err) {
        console.error("Impossible de déconnecter l'utilisateur: " + err);
    }
    return (
        <div className="container">

        </div>
    );
}