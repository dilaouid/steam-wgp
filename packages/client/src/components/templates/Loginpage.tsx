import styled from 'styled-components'
import { Container, Row } from 'react-bootstrap';

import BackgroundImage from '../../assets/images/loginpage/bg.png'
import { LeftColumnLogin } from '../organisms/login/LeftColumnLogin';

const LoginSection = styled.section`
    background: url(${BackgroundImage}) right / cover;
    padding-top: 9px;
    padding-bottom: 27px;
`;

const LoginContainer = styled(Container)`
    margin-top: 21px;
`;

export const Loginpage = () => {
    return (
    <LoginSection>
        <LoginContainer>
            <Row>
                <LeftColumnLogin />
            </Row>
        </LoginContainer>
    </LoginSection>)
}