import { BsExclamationTriangleFill } from "react-icons/bs";

interface CannotCreateSteamderProps {
    children: React.ReactNode;
}

export const CannotCreateSteamder: React.FC<CannotCreateSteamderProps> = ({ children }) => {
    return (
        <p className="text-danger text-center">
            <BsExclamationTriangleFill />
            <br />
            { children }
        </p>
    )
};