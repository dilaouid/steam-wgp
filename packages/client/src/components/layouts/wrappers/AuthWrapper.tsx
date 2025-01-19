import { ReactNode, useEffect } from "react";
import { IUser, useAuthStore, useCheckAuth } from "@steamwgp/shared-ui"
import { Loader } from "@ui/molecules";

import { BASE_URL, SAME_SITE } from "@core/environment";

type AuthWrapperProps = {
    children: ReactNode;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const { data, isError, error, isSuccess, isFetched } = useCheckAuth({ baseUrl: BASE_URL, sameSite: SAME_SITE });
    const { setUser, toggleAuth } = useAuthStore();

    useEffect(() => {
        if (isError) {
            setUser(null);
            toggleAuth(false);
        } else {
            setUser(data as IUser);
            toggleAuth(true);
        }
    }, [isError, data, isSuccess, setUser, toggleAuth, error]);

    if (!isFetched)
        return <Loader />;

    return <>
        { children }
    </>;
};