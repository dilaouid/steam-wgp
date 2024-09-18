import { ReactNode, useEffect } from "react";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "../atoms/Loader";


type AuthWrapperProps = {
    children: ReactNode;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const { data, isError, error, isSuccess, isFetched } = useCheckAuth();
    const { setUser, toggleAuth } = useAuthStore();

    useEffect(() => {
        if (isError) {
            setUser(null);
            toggleAuth(false);
        } else {
            setUser(data);
            toggleAuth(true);
        }
    }, [isError, data, isSuccess, setUser, toggleAuth, error]);

    if (!isFetched)
        return <Loader />;

    return <>
        { children }
    </>;
};