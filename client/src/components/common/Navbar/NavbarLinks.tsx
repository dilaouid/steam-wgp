import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { useContext } from "react";
import { useLocation } from 'react-router-dom';

export default function NavbarLinksComponent() {
    const { auth } = useContext(AuthContext)!;
    const location = useLocation();
    const currentPath = location.pathname;

    return(
    <div className="collapse navbar-collapse" id="navcol-1">
        <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <a className="nav-link" href="#">Faire un don</a>
            </li>
            { auth.user.waitlist ?
                <li className="nav-item">
                    <Link to={"/waitlist/" + auth.user.waitlist} className={`nav-link ${currentPath.substring(0, 8) === "/waitlist" ? "active" : ""}`}>Room actuelle</Link>
                </li>
            : ''}
        </ul>
        <a className="btn btn-outline-primary" role="button" href="/logout">Déconnexion</a>
    </div>);
}