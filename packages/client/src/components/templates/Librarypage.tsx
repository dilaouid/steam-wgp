import { useAuthStore } from '../../store/authStore';
import { useNavigate } from '@tanstack/react-router';


export const Librarypage = () => {

    const { isAuthenticated } = useAuthStore();

    const navigate = useNavigate();
    if (!isAuthenticated) {
        navigate({ to: '/' });
    }

    return (<> </>)
}