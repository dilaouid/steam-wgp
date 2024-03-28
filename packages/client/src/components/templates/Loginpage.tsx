import styled from 'styled-components'
import { Container, Row } from 'react-bootstrap';

import BackgroundImage from '../../assets/images/loginpage/bg.png'
import { LeftColumnLogin } from '../organisms/login/LeftColumnLogin';
import { RightColumnLogin } from '../organisms/login/RightColumnLogin';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from '@tanstack/react-router';

const LoginSection = styled.section`
    background: url(${BackgroundImage}) right / cover;
    padding-top: 9px;
    padding-bottom: 27px;
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
                <LeftColumnLogin />
                <RightColumnLogin />
            </Row>
        </LoginContainer>
    </LoginSection>)
}