import styled from "styled-components";
import { Col, ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const RightBlock = styled.div`
    background: #060606d2;
    padding: 36px;
    border-radius: 26px;
`;

const Title = styled.h4`
    font-family: Agdasima, sans-serif;
`;

const Progress = styled(ProgressBar)`
    margin-top: 23px;
    margin-bottom: 7px;
`;

export const RightColumnLogin: React.FC = () => {
    const { t } = useTranslation('pages/login');

    return(
        <Col className="col-12 col-lg-8 text-center" data-aos="zoom-out" data-aos-duration="600">
            <RightBlock>
                <Title className="text-warning text-opacity-75">{ t('syncing') }</Title>
                <Progress variant="info" striped animated now={37} />
                <ul className="list-unstyled">
                    
                </ul>
            </RightBlock>
        </Col>
    )
};