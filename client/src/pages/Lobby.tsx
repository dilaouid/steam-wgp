import NavbarComponent from "../components/common/Navbar/Navbar";

export default function LobbyPage() {
    return(
    <div>
        <NavbarComponent animate={false} active={"lobby"} />
        <section className="py-4 py-xl-5">
            <p>test</p>
        </section>
    </div>)
}