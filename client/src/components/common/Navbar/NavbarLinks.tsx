export default function NavbarLinksComponent() {
    return(<div className="collapse navbar-collapse" id="navcol-1">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Faire un don</a>
                    </li>
                </ul>
                <a className="btn btn-outline-primary" role="button" href="/logout">Déconnexion</a>
            </div>)
}