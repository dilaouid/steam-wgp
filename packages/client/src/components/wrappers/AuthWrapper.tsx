import { ReactNode, useEffect } from "react";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useAuthStore } from "../../store/authStore";

type AuthWrapperProps = {
    children: ReactNode;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const { data: user, isError, error, isSuccess, isLoading } = useCheckAuth();
    const { setUser, toggleAuth } = useAuthStore();

    useEffect(() => {
        if (isError) {
            console.error(error);
            setUser(null);
            toggleAuth(false);
        } else if (isSuccess) {
            setUser(user);
            toggleAuth(true);
        }
    }, [isError, isSuccess, user, setUser, toggleAuth, error]);

    if (isLoading)
        return <div>Chargement...</div>;

    return <>{children}</>;
};