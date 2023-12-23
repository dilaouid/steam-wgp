import NavbarBrand from "./NavbarBrand";
import './Navbar.css';
import NavbarToggleComponent from "./NavbarToggle";
import NavbarLinksComponent from "./NavbarLinks";

export default function NavbarComponent() {
    return (
    <nav className="navbar navbar-expand-md bg-body bg-opacity-50 py-3"  data-aos="fade-down" data-bs-theme="dark">
        <div className="container">
            <NavbarBrand title="SteamWGP" />
            <NavbarToggleComponent />
            <NavbarLinksComponent />
        </div>
    </nav>);
}