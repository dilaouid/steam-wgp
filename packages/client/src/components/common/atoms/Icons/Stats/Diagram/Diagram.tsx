import { BsFillDiagram3Fill } from "react-icons/bs";

export const DiagramIcon: React.FC = () => {
    return (
        <div className="bs-icon-xl bs-icon-circle text-bg-info d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-2 bs-icon lg" style={{ borderRadius: 50+'%', width: 5+'rem', height: 5+'rem' }}>
            <BsFillDiagram3Fill scale={1.5} size={40} />
        </div>
    )
};