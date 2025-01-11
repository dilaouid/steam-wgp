import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@core/services/API/players/deleteUser";
import { logout } from "@core/services/API/global/auth/logout";

export const useDeleteUser = () => {
    return useMutation({ mutationFn: deleteUser, mutationKey: ['delete', 'user'], onSuccess: () => {
        logout();
    } });
};