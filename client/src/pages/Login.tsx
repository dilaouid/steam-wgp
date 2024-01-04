import { useNavigate } from 'react-router-dom';
import HeadingContainerComponent from '../components/common/Login/HeadingContainer';
import { useContext } from 'react';
import { Auth } from '../context';

export default function LoginPage() {
    const { auth } = useContext(Auth.Context)!;
    const navigate = useNavigate();
    
    if (auth.isAuthenticated) {
        window.history.replaceState(null, '', '/');
        window.history.pushState(null, '', '/');
        window.history.go(0);
        navigate('/');
    }
    return (
        <div className="container">
            <HeadingContainerComponent />
        </div>
    );
}