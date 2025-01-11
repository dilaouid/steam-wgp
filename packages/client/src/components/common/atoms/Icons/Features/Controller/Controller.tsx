import { BsController } from "react-icons/bs";


export const ControllerIcon: React.FC = () => {
    return (
        <div className="bs-icon-md bs-icon-rounded text-bg-info d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon md" style={{ borderRadius: '.5rem', width: 3+'rem', height: 3+'rem' }}>
            <BsController scale={1.5} size={25} />
        </div>
    );
};