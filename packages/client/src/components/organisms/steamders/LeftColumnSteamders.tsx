import styled from "styled-components";
import { Col } from "react-bootstrap";
import { BsDpad, BsInfoCircleFill } from "react-icons/bs";
import { CreateSteamderForm } from "../../molecules/steamders/CreateSteamderForm";
import { useTranslation, Trans } from "react-i18next";

const StyledCol = styled(Col)`
    padding: 19px;
    background: #000000bb;
    border-radius: 47px;
    height: 50%;
`;

const StyledTitle = styled.h4`
    font-family: 'Archivo Narrow', sans-serif;
`;

const StyledText = styled.p`
    font-size: 18px;
    font-family: Abel, sans-serif;
`;

export const LeftColumnSteamders: React.FC = () => {
    const { t } = useTranslation('pages/steamders', { keyPrefix: 'left_column' });

    return (
        <StyledCol sm={12} md={5} lg={4} data-aos="zoom-in" data-aos-duration="500">
            <StyledTitle className="text-info"><BsDpad /> | <Trans t={t} i18nKey="create" components={{ 1: <strong /> }} /> </StyledTitle>

            <StyledText>
                <BsInfoCircleFill /> <Trans t={t} i18nKey="explain_part_1" components={{ 1: <strong /> }} />
            </StyledText>

            <StyledText>
                <Trans t={t} i18nKey="explain_part_2" components={{ 1: <strong /> }} />
            </StyledText>
            <hr />
            <CreateSteamderForm />
        </StyledCol>
    );
};