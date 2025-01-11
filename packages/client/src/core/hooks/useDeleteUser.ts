import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@core/services/api/players/deleteUserApi";
import { logout } from "@core/services/api/global/auth/logoutApi";

export const useDeleteUser = () => {
    return useMutation({ mutationFn: deleteUser, mutationKey: ['delete', 'user'], onSuccess: () => {
        logout();
    } });
};