import { Link } from "react-router-dom";
import { Auth } from "../../../context";
import { useContext } from "react";
import { useLocation } from 'react-router-dom';

export default function NavbarLinksComponent() {
    const { auth } = useContext(Auth.Context)!;
    const location = useLocation();
    const currentPath = location.pathname;

    return(
    <div className="collapse navbar-collapse" id="navcol-1">
        <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <a className="nav-link" href="https://ko-fi.com/dilaouid" target="_blank">Faire un don</a>
            </li>
            { auth.user.waitlist ?
                <li className="nav-item">
                    <Link to={"/waitlist/" + auth.user.waitlist} className={`nav-link ${currentPath.includes("/waitlist") ? "active" : ""}`}>Room actuelle</Link>
                </li>
            : ''}
        </ul>
        <Link to="/logout" className="btn btn-outline-primary" role="button">Déconnexion</Link>
    </div>);
}