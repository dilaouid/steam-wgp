import { BsSteam } from "react-icons/bs";

export const SteamIcon: React.FC = () => {
    return(
    <div className="bs-icon-sm bs-icon-rounded text-bg-info d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon sm" style={{ width: '2rem', height: '2rem', borderRadius: '.5rem' }}>
        <BsSteam />
    </div>);
};