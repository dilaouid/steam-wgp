import styled from 'styled-components'
import { Container, Row } from 'react-bootstrap';
import { useAuthStore } from '@steamwgp/shared-ui';

import BackgroundImage from '@assets/images/loginpage/bg.png'
import { InformationsLogin, ProgressLogin } from '@features/organisms/Login';
import { useNavigate } from '@tanstack/react-router';

const LoginSection = styled.section`
    background: url(${BackgroundImage}) right / cover;
    padding-top: 9px;
    padding-bottom: 27px;
    height: 100vh;
`;

const LoginContainer = styled(Container)`
    margin-top: 21px;
`;

export const Loginpage = () => {

    const { user } = useAuthStore();
    const navigate = useNavigate();

    const loadingLoginComplete = localStorage.getItem('loadingLoginComplete');

    if (!user || loadingLoginComplete) {
        navigate({ to: '/' });
    }

    return (
    <LoginSection>
        <LoginContainer>
            <Row>
                <InformationsLogin />
                <ProgressLogin />
            </Row>
        </LoginContainer>
    </LoginSection>)
}