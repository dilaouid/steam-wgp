import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';

import CoverImage from '@assets/images/librarypage/cover.png';
import { LeftColumnLibrary } from '@organisms/library/LeftColumnLibrary';
import { RightColumnLibrary } from '@organisms/library/RightColumnLibrary';
import { useLibraryStore } from '@store/libraryStore';
import { useGetLibrary } from '@hooks/useLibrary';

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
    const { library, setLibrary } = useLibraryStore();
    const { data, isError } = useGetLibrary();

    if (!isError && data && library.length === 0) {
        setLibrary(data);
    }

    return (
    <LibrarySection>
        <LibraryContainer>
            <Row className='g-3'>
                <LeftColumnLibrary />
                <RightColumnLibrary />
            </Row>
        </LibraryContainer>
    </LibrarySection>)
}