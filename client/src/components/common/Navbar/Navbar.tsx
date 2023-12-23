import NavbarBrand from "./NavbarBrand";
import './Navbar.css';
import NavbarToggleComponent from "./NavbarToggle";
import NavbarLinksComponent from "./NavbarLinks";

interface NavbarComponentProps {
    animate?: boolean;
    active: string;
}

export default function NavbarComponent({ animate = true, active = "" }: NavbarComponentProps) {
    return (
    <nav className="navbar navbar-expand-md bg-body bg-opacity-50 py-3"  data-aos={animate ? "fade-down" : ""} data-bs-theme="dark">
        <div className="container">
            <NavbarBrand title="SteamWGP" />
            <NavbarToggleComponent />
            <NavbarLinksComponent active={active} />
        </div>
    </nav>);
}