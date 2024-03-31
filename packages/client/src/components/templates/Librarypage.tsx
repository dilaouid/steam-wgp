import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Container, Row } from 'react-bootstrap';

import CoverImage from '../../assets/images/librarypage/cover.png';
import { LeftColumnLibrary } from '../organisms/library/LeftColumnLibrary';
import { RightColumnLibrary } from '../organisms/library/RightColumnLibrary';
import { useLibraryStore } from '../../store/libraryStore';
import { useAuthStore } from '../../store/authStore';
import { useGetLibrary } from '../../hooks/useLibrary';

const LibrarySection = styled.section`
    padding-top: 9px;
    padding-bottom: 27px;
    background: url(${CoverImage}) right / cover;
    background-attachment: fixed;
`;

const LibraryContainer = styled(Container)`
    margin-top: 21px;
`;

export const Librarypage = () => {
    const { setLibrary } = useLibraryStore();
    const { isAuthenticated } = useAuthStore();
    const { data, isLoading, isError } = useGetLibrary();

    const navigate = useNavigate();
    if (!isAuthenticated) {
        navigate({ to: '/' });
    }

    useEffect(() => {
        if (data && !isError)
            setLibrary(data);
    }, [data, setLibrary, isError]);

    return (
    <LibrarySection>
        <LibraryContainer>
            { !isLoading && <Row className='g-3'>
                <LeftColumnLibrary />
                <RightColumnLibrary />
            </Row> }
        </LibraryContainer>
    </LibrarySection>)
}