import { useContext } from "react";
import { Auth, Loading } from "../../../context";

import NavbarBrand from "./NavbarBrand";
import NavbarToggleComponent from "./NavbarToggle";
import NavbarLinksComponent from "./NavbarLinks";

import './Navbar.css';

export default function NavbarComponent() {
    const { auth } = useContext(Auth.Context)!;
    const { loadingComplete } = useContext(Loading.Context)!;

    return (
        <div>
            { auth.isAuthenticated && loadingComplete ? 
            <nav className="navbar navbar-expand-md bg-body bg-opacity-50 py-3"  data-aos="fade-down" data-bs-theme="dark">
                <div className="container">
                    <NavbarBrand title="SteamWGP" />
                    <NavbarToggleComponent />
                    <NavbarLinksComponent />
                </div>
            </nav> : <></> }
        </div>
    );
}