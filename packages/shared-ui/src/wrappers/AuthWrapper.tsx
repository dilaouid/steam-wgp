import { ReactNode, useEffect } from "react";

import { useCheckAuth } from "@core/hooks";
import { IUser } from "@core/types";
import { useAuthStore } from "@store/authStore";

type AuthWrapperProps = {
    children: ReactNode;
    Loader: React.FC;
    baseUrl: string;
    sameSite: boolean;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, Loader, baseUrl, sameSite }) => {
    const { data: user, isError, isFetched } = useCheckAuth({ baseUrl, sameSite });
    const setUser = useAuthStore((state) => state.setUser);
    const toggleAuth = useAuthStore((state) => state.toggleAuth);

    useEffect(() => {
        if (isFetched) {
            if (isError || !user) {
                toggleAuth(false);
                setUser(null);
            } else {
                toggleAuth(true);
                setUser(user);
            }
        }
    }, [isFetched, isError, user, setUser, toggleAuth]);

    if (!isFetched) return <Loader />;
    return <>{children}</>;
};
