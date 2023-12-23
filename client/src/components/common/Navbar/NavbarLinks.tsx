import { AuthContext } from "../../../context/AuthProvider";
import { useContext } from "react";

interface NavbarLinksComponentProps {
    active: string;
}

export default function NavbarLinksComponent({ active }: NavbarLinksComponentProps) {
    const { auth } = useContext(AuthContext)!;
    
    return(
    <div className="collapse navbar-collapse" id="navcol-1">
        <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <a className="nav-link" href="#">Faire un don</a>
            </li>
            { auth.user.waitlist ?
            <li className="nav-item">
                <a className={`nav-link ${active === "lobby" ? "active" : ""}`} href={"/waitlist/" + auth.user.waitlist}>Room actuelle</a>
            </li>
            : ''}
        </ul>
        <a className="btn btn-outline-primary" role="button" href="/logout">Déconnexion</a>
    </div>);
}