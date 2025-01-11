import styled from 'styled-components';
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

import CoverImage from '@assets/images/librarypage/cover.png';
import { LeftColumnLibrary } from 'components/features/organisms/library/LeftColumnLibrary';
import { RightColumnLibrary } from 'components/features/organisms/library/RightColumnLibrary';
import { useLibraryStore } from '@store/libraryStore';
import { useGetLibrary } from 'core/hooks/useLibrary';
import { TGameLibrary } from '../../../core/types/TGameLibrary';

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

    useEffect(() => {
        if (library.length > 0) return;
        if (data && !isError) {
            // filter data library by asc order (game_id)
            data.sort((a: TGameLibrary, b: TGameLibrary) => a.game_id.localeCompare(b.game_id));
            setLibrary(data);
        }
    }, [data, library, setLibrary, isError]);

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