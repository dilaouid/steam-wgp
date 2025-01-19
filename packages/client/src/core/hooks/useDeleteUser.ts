import { useMutation } from "@tanstack/react-query";
import { logout } from "@steamwgp/shared-ui";
import { deleteUser } from "@core/services/API/players/deleteUser";

import { BASE_URL } from "@core/environment";

export const useDeleteUser = () => {
    return useMutation({ mutationFn: deleteUser, mutationKey: ['delete', 'user'], onSuccess: () => {
        logout(BASE_URL);
    } });
};