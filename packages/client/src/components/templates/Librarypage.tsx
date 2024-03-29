import styled from 'styled-components';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from '@tanstack/react-router';
import { Container, Row } from 'react-bootstrap';

import CoverImage from '../../assets/images/librarypage/cover.png';
import { LeftColumnLibrary } from '../organisms/library/LeftColumnLibrary';

const LibrarySection = styled.section`
    padding-top: 9px;
    padding-bottom: 27px;
    background: url(${CoverImage}) right / cover;
`;

const LibraryContainer = styled(Container)`
    margin-top: 21px;
`;

export const Librarypage = () => {

    const { isAuthenticated } = useAuthStore();

    const navigate = useNavigate();
    if (!isAuthenticated) {
        navigate({ to: '/' });
    }

    return (
    <LibrarySection>
        <LibraryContainer>
            <Row className='g-0'>
                <LeftColumnLibrary />
            </Row>
        </LibraryContainer>
    </LibrarySection>)
}