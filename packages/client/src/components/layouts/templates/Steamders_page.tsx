import styled from 'styled-components';
import CoverImage from '@assets/images/librarypage/cover.png';
import { Container, Row } from 'react-bootstrap';
import { LeftColumnSteamders } from 'components/features/organisms/steamders/LeftColumnSteamders';
import { RightColumnSteamders } from 'components/features/organisms/steamders/RightColumnSteamders';

const SteamdersSection = styled.section`
    padding-top: 9px;
    padding-bottom: 27px;
    background: url(${CoverImage}) right / cover;
    background-attachment: fixed;
`;

const SteamdersContainer = styled(Container)`
    margin-top: 21px;
`;

export const SteamdersPage = () => {
    return (
        <SteamdersSection>
            <SteamdersContainer>
                <Row className='gx-5'>
                    <LeftColumnSteamders />
                    <RightColumnSteamders />
                </Row>
            </SteamdersContainer>
        </SteamdersSection>
    )
}